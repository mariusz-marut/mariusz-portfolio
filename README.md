# Mariusz Marut

Wizytówka dla rekruterów: Tester manualny / QA Engineer. Strona jest statyczna (HTML, CSS i JavaScript), po polsku i po angielsku.

## Podgląd na komputerze

W tym katalogu:

```powershell
python -m http.server 8080
```

Potem otwórz [http://127.0.0.1:8080/](http://127.0.0.1:8080/).

## Pliki

| Plik | Po co |
| --- | --- |
| `index.html` | Start: doświadczenie, wykształcenie, certyfikaty, konferencje, osiągnięcia |
| `style.css` | Wygląd |
| `lang.js` | Przełącznik PL / EN |
| `aktualnosci.js` | Karty Aktualności |
| `aktualnosci.json` | Treść kart (na razie pusta) |
| `zdjecie.png` | Zdjęcie w kolumnie kontaktu |
| `Mariusz_Marut_CV_PL.pdf` | CV po polsku, link „Pobierz CV” |
| `Mariusz_Marut_CV_EN.pdf` | CV po angielsku, link „Download CV” |

Treść stron pochodzi z Master CV. Angielska wersja jest tłumaczeniem tych samych faktów, bez dopisywania nowych.

## Aktualności

Wpisy biorą się z `aktualnosci.json`. W `linkedin` i `instagram` są najwyżej dwa wpisy, najnowszy pierwszy. Zdjęcia posta trzymaj w katalogu `aktualnosci/`, a ścieżka w JSON jest względem `index.html`.
