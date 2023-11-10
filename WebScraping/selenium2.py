from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from csv import writer
from bs4 import BeautifulSoup
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
import time

driver = Chrome()
driver.get("https://www.tradingview.com/screener")
driver.implicitly_wait(15)

for _ in range(3):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)

rows = driver.find_elements(By.XPATH, '//*[@id="js-screener-container"]/div[4]/table/tbody/tr')

#csv
with open('Webscraping/seleniumdata.csv', 'w', newline='', encoding='utf8') as f:
    thewriter = writer(f)
    header = ['Company', 'Market Cap']
    thewriter.writerow(header)

    count = 0

    for row in rows:
        if count > 418:
            break
        else:
            name_element = row.find_element(By.XPATH, './td[1]/div/div[2]/span[2]')

            name = name_element.text.strip()
            if name.startswith('"') and name.endswith('"'):
                name = name[1:-1]
            print(name)
        
            cap = row.find_element(By.XPATH, './td[8]').text.strip()
            cap = cap[:-3]

            if cap.endswith('B'):
                cap = int(float(cap[:-1]) * 1000000000)
            elif cap.endswith('T'):
                cap = int(float(cap[:-1]) * 1000000000000)

            if str(cap).endswith('9999'):
                cap = str(int(cap) + 1)
        
            thewriter.writerow([name, cap])
            print(cap)
            count += 1

driver.quit()