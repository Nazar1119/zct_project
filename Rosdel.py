import csv
import os


def split_csv(file_path, num_parts, output_folder):
    # Создаем папку для хранения разделенных файлов, если её нет
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Читаем исходный CSV-файл
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        header = next(reader)  # Сохраняем заголовок
        rows = list(reader)

    # Вычисляем количество строк в каждой части
    total_rows = len(rows)
    rows_per_part = total_rows // num_parts

    for i in range(num_parts):
        # Определяем начало и конец для текущей части
        start_index = i * rows_per_part
        end_index = start_index + rows_per_part if i < num_parts - 1 else total_rows

        # Создаем новый CSV-файл
        part_file_path = os.path.join(output_folder, f'part_{i + 1}.csv')
        with open(part_file_path, 'w', encoding='utf-8', newline='') as part_file:
            writer = csv.writer(part_file)
            writer.writerow(header)  # Записываем заголовок
            writer.writerows(rows[start_index:end_index])  # Записываем строки текущей части

        print(f"Файл {part_file_path} создан.")


# Пример использования
split_csv("megaGymDataset.csv", 13, "output_folder")
