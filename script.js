const loveLetterLines = [ "အချစ် နင့်ကို သဘောကျမိတာ ၄၁ ရက်ပဲ ရှိသေးတယ်။",
    "၄၁ ရက်ဆိုတာ တချိုလူတွေအတွက် တိုတောင်းချင် တိုတောင်းနေမယ်။",
    "ငါ့အတွက်တော့ နင့်ကို ပိုပြီး သတိထားမိလာဖို လုံလောက်တဲ့ အချိန်တစ်ခု ဖြစ်ခဲ့တယ်။",
    "နင့်အပြုံးလေးတွေကို သဘောကျတယ်။",
    "နင့်မျက်ဝန်းတွေကို သဘောကျတယ်။",
    "နင့်ရယ်တဲ့အသံလေးကိုလည်း သဘောကျတယ်။",
    "စနောက်တတ်တဲ့ပုံစံလေးကို သဘောကျတယ်။",
    "ပွင့်ပွင့်လင်းလင်းနဲ့ နေတတ်တဲ့ နင့်ရဲ့စိတ်ထားလေးကိုလည်း သဘောကျတယ်။",
    "နင့်ရဲ့အရာအားလုံးကို သဘောကျမိတယ်။",
    "ဘယ်အချိန်ကစပြီး ဒီလိုခံစားမိသွားမှန်း ငါလည်း သေချာမသိဘူး။",
    "သေချာတာတစ်ခုကတော့ နင့်နဲ့ စကားပြောရတဲ့နေ့တွေက ပိုပျော်ဖိုကောင်းလာပြီး",
    "နင့်ကို တွေ့ရတဲ့အချိန်တိုင်း ရင်ထဲမှာ အကြောင်းမရှိဘဲ ပြုံးမိနေတတ်တာပဲ။",
    "ဒီစာကို ရေးတာ နင့်ကို ဖိအားပေးချင်လို မဟုတ်ဘူး။",
    "ငါ့ရင်ထဲက ခံစားချက်ကို ရိုးရိုးသားသား ပြောပြချင်လိုပါ။",
    "နင့်ကို ချစ်နေမိတဲ့",
    "အဲ့ဒီခံစားချက်လေးကို နင့်ကိုသိထားစေချင်ရုံလေးတင်ပါ။  🤍"
];

let isOpened = false;

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const container = document.querySelector('.container');
    const movieScreen = document.getElementById('movieScreen');
    const music = document.getElementById('bgMusic');
    
    if (!isOpened) {
        isOpened = true;
        
        // ၁။ စာအိတ်ခေါင်းကို အရင်ဖွင့်မယ်
        envelope.classList.add('open');
        
        // Piano သီချင်းဖွင့်မယ်
        music.play().catch(error => console.log("Music play blocked:", error));
        
        // ၂။ ဝ.၅ စက္ကန့်နေရင် စာအိတ် Container တစ်ခုလုံးကို Fade Out ဖျောက်လိုက်မယ်
        setTimeout(() => {
            container.classList.add('fade-out');
        }, 500);
        
        // ၃။ ၁ စက္ကန့်ပြည့်ရင် စာအိတ်ကြီးကို လုံးဝဖျောက်ပြီး Movie Screen ကို ဗဟိုမှာ ချပြမယ်
        setTimeout(() => {
            container.style.display = 'none';
            movieScreen.classList.add('show');
            
            // စာစရိုက်မယ်
            startTypewriter();
        }, 1000);
    }
}

async function startTypewriter() {
    const container = document.getElementById('typewriter');
    
    for (let i = 0; i < loveLetterLines.length; i++) {
        let pTag = document.createElement('p');
        container.appendChild(pTag);
        
        await typeLine(loveLetterLines[i], pTag);
        
        // စာရွက်ကို အောက်သို့ အလိုအလျောက် ဆွဲချပေးမယ်
        const movieScreen = document.getElementById('movieScreen');
        movieScreen.scrollTo({
            top: movieScreen.scrollHeight,
            behavior: 'smooth'
        });
        
        await new Promise(resolve => setTimeout(resolve, 700));
    }

    // စာအားလုံး ပြီးသွားရင် GIF ပြမယ်
    const gifBox = document.getElementById('gifContainer');
    gifBox.style.display = 'block';
    
    setTimeout(() => {
        const movieScreen = document.getElementById('movieScreen');
        movieScreen.scrollTo({ top: movieScreen.scrollHeight, behavior: 'smooth' });
    }, 200);
}

function typeLine(text, element) {
    return new Promise(resolve => {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 65); 
            } else {
                resolve();
            }
        }
        type();
    });
}