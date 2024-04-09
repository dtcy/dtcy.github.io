

import google.generativeai as genai

genai.configure(api_key="AIzaSyDF7xMEG1iN4_LBVKW_1207AWgNowbDgnQ")

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

convo = model.start_chat(history=[
  
])

convo.send_message("이태원은 ㄷ")
print(convo.last.text)

# import PIL.Image

# img = PIL.Image.open('image.jpg')
# img

# model = genai.GenerativeModel('gemini-pro-vision')

# response = model.generate_content(["이 제품을 홍보하는 글을 써봐", img], stream=True)
# result = response.resolve()

# print(result)


# from instabot import Bot

# bot = Bot()
# bot.login(username= "matiasyoon@gmail.com", password="Itaewon251!")
# bot.upload_photo("image.jpg",caption="test")
