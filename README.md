# Adam asmaca · Magistr viktorinası

Magistr səviyyəli ümumi dünya görüşü suallarına əsaslanan brauzer oyunu (Hangman).

## Xüsusiyyətlər
- 70 suallıq baza (7 kateqoriya × 10 sual)
- Hər iştirakçıya bazadan fərqli 10 sual seçilir
- 4 obraz: Robi, Kosmo, Bobo, Mirtil (3D animasiya üslubunda SVG)
- Azərbaycan əlifbası (32 hərf), fiziki klaviatura dəstəyi
- İştirakçılar üzrə xal cədvəli (səhifə açıq qaldıqca)
- Açıq və tünd rejim

## İşə salmaq
Quraşdırma tələb olunmur. `index.html` faylını brauzerdə açın.

## GitHub Pages ilə yayımlamaq
1. Faylları repozitoriyaya yükləyin.
2. **Settings → Pages → Branch: main / root** seçin.
3. Bir neçə dəqiqə sonra `https://<istifadəçi>.github.io/<repo>/` ünvanında açılacaq.

## Sualları dəyişmək
`questions.js` faylında hər sual `"sual|cavab"` formatındadır. Cavab tək sözdən ibarət olmalı və yalnız Azərbaycan əlifbasının hərflərini ehtiva etməlidir. Sual sayını dəyişsəniz, `script.js`-dəki `70` və `10` ədədlərini və kateqoriya hesabını (`/10`) uyğunlaşdırın.

## Fayllar
| Fayl | Təyinat |
|---|---|
| `index.html` | Səhifə strukturu |
| `style.css` | Dizayn |
| `questions.js` | Sual bazası |
| `script.js` | Oyun məntiqi və obrazlar |

## Lisenziya
MIT
