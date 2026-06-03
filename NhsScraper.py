from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

import pandas as pd
import time


URL = "https://wyvhp.nimsite.uk/"
POSTCODE = "TR1 3AY"

options = Options()
# Headless disabled because site does not load cards properly in headless
options.add_argument("--window-size=1400,1000")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

wait = WebDriverWait(driver, 30)


def get_value_after_label(lines, label):
    for i, line in enumerate(lines):
        if line.lower().strip() == label.lower().strip():
            return lines[i + 1] if i + 1 < len(lines) else ""
    return ""


def get_last_update(lines):
    for line in lines:
        if line.startswith("Last update:"):
            return line.replace("Last update:", "").strip()
    return ""


def get_wait_journey(lines):
    for i, line in enumerate(lines):
        if line.startswith("Last update:"):
            if i + 2 < len(lines):
                return lines[i + 1] + " " + lines[i + 2]
    return ""


def find_cards():
    full_detail_buttons = driver.find_elements(
        By.XPATH,
        "//*[contains(text(), 'Full Details')]"
    )

    print("Full Details buttons found:", len(full_detail_buttons))

    cards = []

    for button in full_detail_buttons:
        parent = button

        for _ in range(10):
            try:
                parent = parent.find_element(By.XPATH, "..")
                text = parent.text.strip()

                if (
                    "Waiting time" in text
                    and "Patients in department" in text
                    and "Distance" in text
                ):
                    cards.append(parent)
                    break
            except:
                break

    return cards


try:
    driver.get(URL)
    time.sleep(5)

    print("Website opened")

    set_postcode = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//*[contains(text(), 'Set your postcode')]")
        )
    )
    set_postcode.click()
    print("Clicked Set your postcode")

    time.sleep(2)

    postcode_input = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, '[data-testid="text-input-flat"]')
        )
    )

    postcode_input.click()
    postcode_input.clear()
    postcode_input.send_keys(POSTCODE)
    print("Postcode entered")

    time.sleep(2)

    update_button = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//*[contains(text(), 'Update')]")
        )
    )
    update_button.click()
    print("Clicked Update")

    time.sleep(5)

    urgent_services = wait.until(
        EC.element_to_be_clickable(
            (By.XPATH, "//*[contains(text(), 'Local Urgent Care') or contains(text(), 'Emergency Services')]")
        )
    )
    urgent_services.click()
    print("Clicked Local Urgent Care & Emergency Services")

    time.sleep(8)

    cards = find_cards()
    print("Cards found:", len(cards))

    rows = []

    for card in cards:
        lines = card.text.strip().split("\n") 
        lines = [line.strip() for line in lines if line.strip()]

        hospital_name = lines[0] if len(lines) > 0 else ""
        service_type = lines[1] if len(lines) > 1 else ""

        rows.append({
            "postcode": POSTCODE,
            "hospital_name": hospital_name,
            "service_type": service_type,
            "wait_journey": get_wait_journey(lines),
            "waiting_time": get_value_after_label(lines, "Waiting time"),
            "patients_in_department": get_value_after_label(lines, "Patients in department"),
            "patients_waiting": get_value_after_label(lines, "Patients waiting"),
            "distance": get_value_after_label(lines, "Distance"),
            "last_update": get_last_update(lines),
            "raw_text": " | ".join(lines)
        })

    df = pd.DataFrame(rows).drop_duplicates()

    print(df)

    df.to_csv("nhsquicker_results_clean.csv", index=False)

    print("CSV saved as nhsquicker_results_clean.csv")

except Exception as e:
    print("Main error:", e)

finally:
    driver.quit()
    print("Browser closed")