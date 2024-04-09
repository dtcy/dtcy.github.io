
import google.generativeai as genai

genai.configure(api_key="AIzaSyDF7xMEG1iN4_LBVKW_1207AWgNowbDgnQ")

import PIL.Image

img = PIL.Image.open('image.jpg')
img

model = genai.GenerativeModel('gemini-pro-vision')
response = model.generate_content(["무슨색 가방이지?", img], stream=True)
response.resolve()
print(response.text)