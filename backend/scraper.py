from playwright.sync_api import sync_playwright

def scrape_website(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, timeout=60000)
        content = page.content()
        title = page.title()
        headings = page.locator("h1, h2, h3").all_text_contents()
        browser.close()
    return {
        "title": title,
        "headings": headings,
        "html": content
    }
