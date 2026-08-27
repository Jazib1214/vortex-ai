function toggleSidebar() {
    document.getElementById('appSidebar').classList.toggle('collapsed');
}

function autoGrow(element) {
    element.style.height = '24px';
    element.style.height = (element.scrollHeight) + 'px';
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function toggleUploadPopup(event) {
    if(event) event.stopPropagation();
    closeDotsDropdown();
    const popup = document.getElementById('uploadPopup');
    popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
}

function toggleDotsDropdown(event) {
    if(event) event.stopPropagation();
    const uploadPopup = document.getElementById('uploadPopup');
    if(uploadPopup) uploadPopup.style.display = 'none';
    const dropdown = document.getElementById('dotsDropdown');
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

function closeDotsDropdown() {
    const dropdown = document.getElementById('dotsDropdown');
    if(dropdown) dropdown.style.display = 'none';
}

function handleMenuAction(action) {
    closeDotsDropdown();
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Menu Action: ${action}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai">Aapke active session ke liye <b>${action}</b> successfully execute kar diya gaya hai. Saare parameters update ho chuke hain, Jazib!</div>
            </div>
        </div>
    `);
    document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function handleUpload(type) {
    document.getElementById('uploadPopup').style.display = 'none';
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Selected tool: [${type}]</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai"><b>${type}</b> module aapke workspace mein successfully load ho chuka hai. Ab aap apni instructions de sakte hain.</div>
            </div>
        </div>
    `);
    document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function executeFeature(featureName) {
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Activated feature: ${featureName}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai">Vortex AI ne <b>${featureName}</b> module successfully initialize kar diya hai. Aap is mode ke andar advanced queries aur analysis run kar sakte hain.</div>
            </div>
        </div>
    `);
    document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function startJazibVoice() {
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        const input = document.getElementById('userInput');
        input.placeholder = "Listening... Speak now...";

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            input.value = speechResult;
            autoGrow(input);
            input.placeholder = "Ask Vortex AI or type a topic...";
        };

        recognition.onerror = function() {
            input.placeholder = "Ask Vortex AI or type a topic...";
        };

        recognition.onend = function() {
            input.placeholder = "Ask Vortex AI or type a topic...";
        };

        recognition.start();
    } catch(e) {
        alert("Voice feature initialized. Make sure mic permission is allowed.");
    }
}

function startNewChat() {
    document.getElementById('chatContentInner').innerHTML = `
        <div class="welcome-center" id="welcomeCenter">
            <h1>New Chat Session.</h1>
            <p>Aaj aap kya create karna chahte hain, Jazib?</p>
        </div>
    `;
}

function loadHistory(title) {
    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    inner.innerHTML = `
        <div class="message-row">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">Load history: ${title}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai"><b>${title}</b> ki session history successfully load ho chuki hai. Saare writing aur code tools active hain.</div>
            </div>
        </div>
    `;
}

// INTELLIGENT QUERY ROUTER & PARSER (URDU / ROMAN URDU SUPPORTED)
function generateResponse(query) {
    const q = query.toLowerCase().trim();

    if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'salam' || q === 'assalam o alaikum') {
        return "Walaikum Assalam Jazib! Main Vortex AI hoon. Aaj aapke workspace tasks, writing projects ya coding queries mein kis tarah madad kar sakta hoon?";
    }
    else if (q === 'ok' || q === 'okay' || q === 'cool' || q === 'thanks' || q === 'great' || q === 'theek hai') {
        return "Bohat khoob, Jazib! Ab aap agla kya explore ya build karna chahenge?";
    }
    else if (q.includes('who made it') || q.includes('who created you') || q.includes('kis ne banaya') || q.includes('kisne banaya')) {
        return "Yeh elite Vortex AI workspace <b>Jazib</b> ne khud design aur create kiya hai! Yeh high-speed coding, document structuring, aur task automation ke liye custom-built hai.";
    }
    else if (q.includes('download') || q.includes('save') || q.includes('save image')) {
        return `Apni generated file ya asset ko download karne ke liye, Jazib, upar right corner mein maujood <b>Three Dots (⋮)</b> par click karein aur <b>Download</b> select karein, ya seedha canvas par right-click karke save kar lein!`;
    }
    else if (q.includes('image') || q.includes('picture') || q.includes('tasveer') || q.includes('banao')) {
        return `Image generation ki request mil chuki hai, Jazib! Prompt process ho raha hai: <i>"${query}"</i>.<br><br><div style="margin-top:10px; padding:20px; background:#090a0f; border:1px solid var(--border-glass); border-radius:12px; text-align:center;"><span style="color:#818cf8; font-weight:700;">🖼️ Nano Banana Image Studio</span><br><p style="font-size:13px; color:var(--text-muted); margin-top:6px;">Aapka visual prompt workspace canvas par successfully render ho gaya hai. Mazeed refinement ya download ke liye tayyar hai!</p></div>`;
    }
    else if (q.includes('difference') || q.includes('vs') || q.includes('compare') || q.includes('farq')) {
        return `Detailed analytical comparison request receive ho gayi hai, Jazib: <i>"${query}"</i>.<br><br>• <b>Core Architecture:</b> Donon entities ke darmiyan farq samajhne ke liye unke core hardware specs, release tiers aur primary use cases ko dekhna zaroori hai.<br>• <b>Performance & Metrics:</b> Ek high-efficiency rendering aur modern integration par focus karta hai, jabke doosra balanced performance aur everyday reliability ke liye hai.<br><br><b>Analytical Verdict:</b> Donon bilkul alag target segments ke liye hain. Agar aapko iska koi specific tabular breakdown ya metric chahiye toh mujhe batayein!`;
    }
    else if (q.includes('mechanical') || q.includes('engineer') || q.includes('pdf') || q.includes('design')) {
        return `Mechanical engineering suite aur PDF workflow ke hawale se aapka sawal note kar liya hai, Jazib. Is module ke zariye aap complex calculations, structural blueprints aur technical reports ko aasani se manage kar sakte hain. Bataiye isme mazeed kya detail add karni hai?`;
    }
    else if (q.includes('code') || q.includes('html') || q.includes('css') || q.includes('javascript')) {
        return `Yeh lijiye aapke maange gaye code ka solution, Jazib:<br><br><pre style="background:#090a0f; padding:12px; border-radius:8px; overflow-x:auto; font-family:'JetBrains Mono', monospace; font-size:13px; color:#a855f7;"><code>&lt;!-- Optimized Vortex Component --&gt;\n&lt;div class="vortex-container"&gt;\n    &lt;h2&gt;Workspace Active&lt;/h2&gt;\n    &lt;p&gt;Successfully compiled for Jazib (PRO)&lt;/p&gt;\n&lt;/div&gt;</code></pre>`;
    }
    else {
        return `Aapke sawal par comprehensive analysis generate kar di gayi hai, Jazib: <i>"${query}"</i>.<br><br>Aapke input parameters ke mutabiq, yeh topic advanced technical concepts aur multi-variable criteria par mushtamil hai. Is modular workspace configuration ke andar engine structural variables aur comparative parameters ko evaluate karke behtareen response deta hai. Agar aapko isme kisi specific hissay par mazeed tafseel chahiye toh zaroor batayein!`;
    }
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;

    const center = document.getElementById('welcomeCenter');
    if(center) center.style.display = 'none';

    const inner = document.getElementById('chatContentInner');
    
    const userRowID = 'msg-' + Date.now();
    inner.insertAdjacentHTML('beforeend', `
        <div class="message-row" id="${userRowID}">
            <div class="msg-wrapper-user">
                <div class="msg-bubble user">${text}</div>
            </div>
            <div class="msg-wrapper-ai">
                <div class="msg-bubble ai" id="ai-resp-${userRowID}">
                    <div class="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    `);

    input.value = '';
    input.style.height = '24px';

    const container = document.getElementById('chatContainer');
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
        const aiBubble = document.getElementById(`ai-resp-${userRowID}`);
        if(aiBubble) {
            aiBubble.innerHTML = generateResponse(text);
            container.scrollTop = container.scrollHeight;
        }
    }, 1200);
}

function handleKeyPress(e) {
    e.stopPropagation();
    if(e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

document.getElementById('sendBtn').addEventListener('click', sendMessage);

window.onclick = function(event) {
    if (!event.target.matches('.tool-icon-btn') && !event.target.closest('.upload-popup')) {
        const popup = document.getElementById('uploadPopup');
        if (popup && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    }
    if (!event.target.matches('.top-three-dots') && !event.target.closest('.dots-dropdown')) {
        closeDotsDropdown();
    }
}
