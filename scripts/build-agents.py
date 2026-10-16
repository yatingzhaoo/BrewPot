"""Generate the public Agent page and text endpoints from content/for-agents.md."""
from pathlib import Path
import html
import re
root = Path(__file__).resolve().parents[1]
text = (root / 'content/for-agents.md').read_text()
out = root / 'public'
(out / 'for-agents').mkdir(parents=True, exist_ok=True)
# Link raw URLs before escaping their query separators twice.
def inline(s):
    parts = re.split(r'(https://[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]+)', s)
    return ''.join('<a href="' + html.escape(('mailto:' if '@' in p and not p.startswith('https:') else '') + p, quote=True) + '">' + html.escape(p) + '</a>' if i % 2 else html.escape(p) for i,p in enumerate(parts))
blocks=[]
toc=[]
for block in text.strip().split('\n\n'):
    lines=block.splitlines()
    if block.startswith('#'):
        level=len(block)-len(block.lstrip('#'))
        label=block[level:].strip()
        slug=re.sub(r'[^a-z0-9]+','-',label.lower()).strip('-')
        blocks.append(f'<h{level} id="{slug}">{inline(label)}</h{level}>')
        if level == 2: toc.append(f'<a href="#{slug}">{html.escape(label)}</a>')
    elif block.startswith('> '): blocks.append('<p class="intro">'+inline(block[2:])+'</p>')
    elif block.startswith('- '): blocks.append('<ul>'+''.join('<li>'+inline(line[2:])+'</li>' for line in lines)+'</ul>')
    elif re.match(r'1\. ',block): blocks.append('<ol>'+''.join('<li>'+inline(re.sub(r'^\d+\. ','',line))+'</li>' for line in lines)+'</ol>')
    else: blocks.append('<p>'+'<br>'.join(inline(line.strip()) for line in lines)+'</p>')
page='''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>For Agents — BrewPot</title><meta name="description" content="Official BrewPot information for AI agents: product design services, pricing, collaboration, project experience, and contact details.">
<link rel="canonical" href="https://brewpot.co/for-agents/"><link rel="alternate" type="text/markdown" href="https://brewpot.co/for-agents.md" title="Markdown version"><link rel="icon" href="/favicon.png">
<style>
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:28px}body{margin:0;background:#faf9f6;color:#242623;font:17px/1.75 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:#345b48;text-underline-offset:4px;overflow-wrap:anywhere}a:hover{color:#142d20}a:focus-visible{outline:3px solid #6e997e;outline-offset:5px}.top{max-width:1160px;margin:auto;padding:25px 32px;display:flex;justify-content:space-between;gap:24px;border-bottom:1px solid #dedfd7}.brand{font-weight:750;font-size:22px;text-decoration:none;color:#242623}.formats{display:flex;align-items:center;gap:22px;font-size:14px}.layout{max-width:1160px;margin:64px auto;display:grid;grid-template-columns:225px minmax(0,740px);gap:70px;padding:0 32px}aside{position:sticky;top:28px;align-self:start;font-size:13px;line-height:1.5}aside strong{display:block;text-transform:uppercase;letter-spacing:.1em;font-size:11px;margin-bottom:16px;color:#6c7067}aside a{display:block;margin:12px 0;text-decoration:none;color:#62675e}h1{font-size:clamp(32px,4.5vw,48px);line-height:1.16;letter-spacing:-.045em;margin:0 0 26px;font-weight:650}h2{margin:56px 0 20px;padding-top:22px;border-top:1px solid #dedfd7;font-size:26px;line-height:1.3;letter-spacing:-.025em}h3{font-size:20px;margin:30px 0 12px}p{margin:18px 0}.intro{font-size:19px;color:#62675e}li{margin:9px 0}ul,ol{padding-left:23px}footer{max-width:1160px;margin:0 auto;padding:28px 32px 42px;border-top:1px solid #dedfd7;font-size:14px;color:#62675e}.skip{position:absolute;left:-9999px}.skip:focus{left:20px;top:10px;background:white;padding:10px}@media(max-width:800px){.layout{display:block;margin:38px auto;padding:0 22px}aside{position:static;margin-bottom:36px;padding-bottom:20px;border-bottom:1px solid #dedfd7}aside nav{display:flex;flex-wrap:wrap;gap:8px 18px}aside a{margin:0;font-size:12px}.top{padding:20px 22px}.formats{gap:14px;font-size:12px}body{font-size:16px}h2{font-size:24px}footer{padding:25px 22px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style></head><body><a class="skip" href="#content">Skip to content</a><header class="top"><a class="brand" href="/">BrewPot</a><nav class="formats" aria-label="Document formats"><a href="/for-agents.md">Markdown</a><a href="/llms.txt">Agent index</a></nav></header><div class="layout"><aside><strong>On this page</strong><nav aria-label="Table of contents">'''+''.join(toc)+'''</nav></aside><main id="content">'''+ '\n'.join(blocks)+'''</main></div><footer>Official studio information · <a href="/">BrewPot home</a> · <a href="/for-agents.md">Read as Markdown</a></footer></body></html>'''
(out/'for-agents/index.html').write_text(page)
(out/'for-agents.md').write_text(text)
(out/'llms-full.txt').write_text(text)
(out/'llms.txt').write_text('''# BrewPot

> BrewPot is a California product design studio independently run by Yating Zhao, providing product strategy, UX and UI design for startups through one monthly subscription.

## Official studio information

- [Complete information for agents](https://brewpot.co/for-agents.md): Services, fit, collaboration, pricing, availability guidance, selected projects, contact details, and agent guidance.
- [Readable web page](https://brewpot.co/for-agents/): The same official information as static HTML.
- [Full text](https://brewpot.co/llms-full.txt): The complete document in plain text.
- [Homepage](https://brewpot.co/): Explore the design subscription for startups.
- [Case studies](https://brewpot.co/?view=case-studies): Public project details.
''')
print('Generated Agent HTML, Markdown, index, and full text.')
