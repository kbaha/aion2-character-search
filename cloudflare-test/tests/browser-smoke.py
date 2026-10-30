# Run: python -m pip install playwright
# Then: python cloudflare-test/tests/browser-smoke.py (Microsoft Edge installed)
import json, re, mimetypes
from pathlib import Path
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parents[1]/'public'
import tempfile
screenshots=Path(tempfile.mkdtemp(prefix='aion2-browser-'))
data=json.loads((root/'data/recursos-reshanta-inferior.json').read_text(encoding='utf-8'))
assert len(data['points'])==240 and len(data['teleports'])==2
for p,m in zip(data['points'],data['sourceMarkers'][:240]):
    assert p==[0,round(m['x']/4096*100,3),round(m['y']/4096*100,3)]
assert len({m['id'] for m in data['sourceMarkers']})==242
assert all(m['subtype']=='gatheringOdyle' for m in data['sourceMarkers'][:240])

with sync_playwright() as pw:
    browser=pw.chromium.launch(executable_path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',headless=True,args=['--no-proxy-server'])
    page=browser.new_page(viewport={'width':1440,'height':1000})
    errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
    base='https://hub.test'
    def serve(route):
        from urllib.parse import urlparse
        name=urlparse(route.request.url).path.lstrip('/') or 'index.html'
        file=root/name
        if file.is_file(): route.fulfill(body=file.read_bytes(),content_type=mimetypes.guess_type(str(file))[0] or 'application/octet-stream')
        else: route.fulfill(status=404,body='Not found')
    page.route(base+'/**',serve)
    def serve_map(route):
        # Test the UI offline; original external artwork is not a test dependency.
        route.abort()
    page.route('https://raw.githubusercontent.com/problem-xyz/aion2-map-overlay/main/assets/maps/**',serve_map)
    page.goto(base+'/maps.html')
    assert page.locator('#region-cards .card').count()==3
    assert not re.search('Poeta|Ishalgen|áreas iniciais',page.content(),re.I)
    page.get_by_role('button',name='Abismo',exact=True).click()
    assert page.locator('#region-cards .card').count()==1
    page.locator('#region-cards a').click()
    page.wait_for_function("document.querySelector('#visible-count').textContent==='240'")
    assert page.locator('#zone').input_value()=='reshanta-inferior'
    assert 'Global' in page.locator('#coverage-notice').inner_text()
    assert 'imagem do mapa pendente' in page.locator('#map-quality').inner_text()
    assert page.locator('#teleport-select option').count()==2
    assert page.locator('#specific option').count()==2
    assert page.locator('[data-group=ore]').is_disabled()
    page.locator('#zoom-in').click()
    assert page.locator('#zoom-level').inner_text()!='1,0×'
    viewport=page.locator('#viewport');viewport.scroll_into_view_if_needed()
    box=viewport.bounding_box()
    page.mouse.move(box['x']+box['width']/2,box['y']+box['height']/2)
    page.mouse.wheel(0,-500)
    page.locator('#zoom-slider').fill('6')
    before=page.locator('#map-art').screenshot()
    page.mouse.move(box['x']+box['width']/2,box['y']+box['height']/2)
    page.mouse.down();page.mouse.move(box['x']+box['width']/2+80,box['y']+box['height']/2+40,steps=5);page.mouse.up()
    page.wait_for_timeout(100)
    assert before!=page.locator('#map-art').screenshot(), 'Pan did not move grid'
    page.locator('#reset-view').click()
    assert page.locator('#zoom-level').inner_text()=='1,0×'
    page.locator('#start-mode').select_option('teleport')
    page.locator('#teleport-select').select_option('1')
    page.locator('#route').click()
    assert page.locator('#route-stops li').count()==12
    assert 'teleporte 2' in page.locator('#route-summary').inner_text()
    page.locator('#route-stops button').first.click()
    page.locator('#mark').click()
    assert page.locator('#done-count').inner_text().startswith('1 visitados')
    page.reload();page.wait_for_function("document.querySelector('#visible-count').textContent==='240'")
    assert page.locator('#done-count').inner_text().startswith('1 visitados')
    page.locator('#hide-done').check()
    assert page.locator('#visible-count').inner_text()=='239'
    page.locator('#zone').select_option('verteron')
    page.wait_for_function("document.querySelector('#teleport-select').options.length===61")
    assert page.locator('#coverage-notice').is_hidden()
    assert page.locator('#done-count').inner_text().startswith('0 visitados')
    page.locator('#route').click();assert page.locator('#route-stops li').count()==12
    page.locator('#zone').select_option('altgard')
    page.wait_for_function("document.querySelector('#teleport-select').options.length===61 && !document.querySelector('#route').disabled")
    assert page.locator('#map-name').inner_text()=='Altgard · Asmodianos'
    page.locator('#zone').select_option('reshanta-inferior')
    page.wait_for_function("document.querySelector('#visible-count').textContent==='239'")
    page.locator('#start-mode').select_option('map');page.locator('#choose-start').click()
    viewport.click(position={'x':200,'y':200})
    assert 'Ponto manual' in page.locator('#start-status').inner_text()
    page.locator('#route').click();assert page.locator('#route-stops li').count()==12
    page.locator('#circuit').uncheck();assert 'Sequência aberta' in page.locator('#route-summary').inner_text()
    page.locator('#stop-count').select_option('24');page.locator('#route').click()
    assert page.locator('#route-stops li').count()==24
    page.locator('#clear-route').click();assert page.locator('#route-stops li').count()==0
    page.locator('#reset-view').click()
    page.evaluate('window.scrollTo(0,0)')
    page.screenshot(path=str(screenshots/'reshanta-desktop.png'),full_page=True)
    page.set_viewport_size({'width':390,'height':844})
    page.screenshot(path=str(screenshots/'reshanta-mobile.png'),full_page=True)
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), 'Mobile overflow'
    page.screenshot(path=str(screenshots/'reshanta-mobile.png'),full_page=True)
    # A failed request must not keep old region points/routes clickable.
    page.route('**/data/recursos-reshanta-inferior.json',lambda r:r.fulfill(status=503,body='unavailable'))
    page.reload();page.wait_for_function("document.querySelector('#loading').textContent.includes('HTTP 503')")
    assert page.locator('#route').is_disabled()
    assert page.locator('#visible-count').inner_text()=='0'
    assert not errors, errors
    browser.close()
print('PASS: source coordinates, Atlas links, filters, zoom, pan, teleports, routes, visits persistence/isolation, mobile layout, fetch failure; no JavaScript errors.')
