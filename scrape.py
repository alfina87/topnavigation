import gspread
import requests
from oauth2client.service_account import ServiceAccountCredentials
import datetime
from bs4 import BeautifulSoup
import smtplib


json_key = 'credentials.json'
spread_key = r'1qOX-USEfhIOGh7Srn_3KylSyOau1Jt4PeOpuPZtUEsU'
spread_url = r'https://docs.google.com/spreadsheets/d/1qOX-USEfhIOGh7Srn_3KylSyOau1Jt4PeOpuPZtUEsU'
scope = ['https://spreadsheets.google.com/feeds']
to_adress = 'automatedchecks17@gmail.com'


def send_alert(url):
    subject = 'Pages with no H1'
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    # Put here login and password for email snder
    server.login("h1checkscript@gmail.com", "checkcheck12")
    # Modify Subject here
    header = 'Subject: %s\n\n' % subject
    # Here messega is defined so you can add something
    msg = spread_url
    message = header + msg
    # Do not forget to modify sending adress here too
    server.sendmail("h1checkscript@gmail.com", to_adress, message)
    server.quit()


def get_urls():
    credentials = ServiceAccountCredentials.from_json_keyfile_name(json_key,
                                                                   scope)

    gc = gspread.authorize(credentials)

    sh = gc.open_by_key(spread_key)
    main_worksheet = sh.get_worksheet(0)

    url_list = [v for v in main_worksheet.col_values(1) if v != ''][1:]
    return url_list, sh


def scrape_url(url):
    r = requests.get(url)
    print(url, ' - ', r.status_code)
    html_doc = r.text
    soup = BeautifulSoup(html_doc, 'lxml')
    h1s = soup.find_all('h1')
    if len(h1s) > 0:
        return [h1.contents for h1 in h1s]
    else:
        return ["NO"]


def scrape_urls(url_list):
    res = []
    for url in url_list:
        res.append(scrape_url(url))
    return res


def write_results(res, sh, urls):
    cols = max([len(r) for r in res]) + 1
    rows = len(res)
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    wks = sh.add_worksheet(now, rows, cols)
    for row, result in enumerate(res):
        wks.update_cell(row + 1, 1, urls[row])
        for i, r in enumerate(result):
            wks.update_cell(row + 1, i + 2, r)


def scrape():
    urls, sh = get_urls()
    print('Got urls')
    # print(urls)
    results = scrape_urls(urls)
    write_results(results, sh, urls)
    if ["NO"] in results:
        print('Sending alert')
        send_alert(urls)


if __name__ == '__main__':
    scrape()
