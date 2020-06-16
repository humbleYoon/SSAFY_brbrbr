import pyttsx3
engine = pyttsx3.init()
engine.say("I will speak this text")
engine.runAndWait()

# from gtts import gTTS
# text = '안녕하세요. 도움이 필요하신가요?'

# tts = gTTS(text=text, lang='ko')
# tts.save('en인사.mp3')



# import pyttsx

# engine = pyttsx.init()

# engine.say('Greetings')
# engine.say('안녕하세요')

# engine.runAndWait()