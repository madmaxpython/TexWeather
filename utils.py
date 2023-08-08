from datetime import datetime


def date_formatter(date_str):
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")

    weekday = date_obj.strftime("%a")
    day_of_month = date_obj.strftime("%-d")
    month = date_obj.strftime("%-m")

    formatted_date = f"{weekday} {day_of_month}/{month}"

    return formatted_date
