from csv import writer
import requests
from bs4 import BeautifulSoup
url = "https://www.liberatedstocktrader.com/sp-500-companies/"
page = requests.get(url)

soup = BeautifulSoup(page.content, 'html.parser')
results = soup.find_all('tr', class_='')

results.pop(0)
results.pop(len(results)-1)
# print(results)

with open('capdata.csv', 'w', newline='', encoding='utf8') as f:
    thewriter = writer(f)
    header = ['Company', 'Market Cap']
    thewriter.writerow(header)
    count = 0
    for result in results:
        nameRaw = result.find_all('td', class_='')[1].text
        name = nameRaw.strip()
        capRaw = result.find_all('td', class_='')[3].text

        cap = capRaw.replace("\xa0", "")
        info = [name, cap]
        thewriter.writerow(info)

        if count == 418:
            name = name[0: 6] + "'" + name[7: len(name)]
            print(name)

        count += 1

# This is a test
