import random
import os

style_path = r'c:\Users\anwin\OneDrive\Desktop\portfolio website\static\css\style.css'

# Generate static stars box-shadow
shadows = []
for _ in range(700):
    x = random.randint(0, 2000)
    y = random.randint(0, 2000)
    opacity = random.random()
    size = random.choice(['1px', '2px'])
    shadows.append(f'{x}px {y}px 0 {opacity}px #FFF')

shadow_string = ', '.join(shadows)

new_css = f"""
/* Pure CSS Night Sky & Milky Way */
.milky-way-bg {{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
}}

.static-stars {{
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: {shadow_string};
    animation: anime-stars 50s linear infinite;
}}

.static-stars::after {{
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: {shadow_string};
}}

@keyframes anime-stars {{
    from {{ transform: translateY(0px); }}
    to {{ transform: translateY(-2000px); }}
}}

/* Milky Way Band Concept */
.milky-way-band {{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(100, 100, 255, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 20% 80%, rgba(200, 100, 255, 0.05) 0%, transparent 40%);
    filter: blur(20px);
    z-index: -1;
    opacity: 0.8;
}}
"""

# Read existing CSS
with open(style_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the old .milky-way-bg and .stars blocks if possible, or just append and rely on cascade
# For cleanliness, let's append but finding a good spot.
# Actually, I'll just append it to the end, but I need to make sure I don't duplicate too much if I run this multiple times.
# I'll modify the .milky-way-bg definition if it exists, otherwise append.

if '.milky-way-bg {' in content:
    # Basic replacement of the old block is risky with regex if complex.
    # I will just define these NEW classes at the end, and update the HTML to use them.
    # But wait, .milky-way-bg is already used. I should override it.
    pass

with open(style_path, 'a', encoding='utf-8') as f:
    f.write(new_css)

print("CSS updated successfully.")
