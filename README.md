# Тестовое задание от компании All Funeral Services для JS разработчика

Необходимо сверстать и "оживить" интерфейс, макет которого расположен тут: https://www.figma.com/file/Ti2cpYwuWA5D0WulQAM92x/Test-assignment?node-id=0%3A1

В процессе выполнения тестового задания нужно использовать тестовый API, описание работы с которым см. ниже.

## Требования
- Интерфейс должен быть сверстан в полном соответствии макету
- Внешний вид интерфейса при редактировании должен оформляться с учетом предложенного дизайна компонентов UI
- Там, где верстка не предусмотрена дизайном макета, нужно принять самостоятельное решение по внешнему виду элементов
- Для реализации интерфейса необходимо использовать ReactJS
- Интерфейс должен уметь:
  - отображать данные, полученные из API
  - отправлять к API запрос на редактирование данных карточки
  - отображать обновленные данные после успешного редактирования
  - загружать/удалять приложенные картинки
  - отправлять запрос на удаление карточки
- Результат выполнения задания должен быть выложен в любой открытый репозиторий

## API
### Особенности

API возвращает информацию по одной организации ```GET /companies/12``` и одному контакту организации ```GET /contacts/16```.

API не выполняет реальных действий сохранения данных.

API временно сохраняет загруженные изображения.

### Адрес
http://135.181.35.61:2112/

### Доступ
Работа с API возможна после получения авторизационного токена

### Методы API
- ```GET /auth```
- ```GET /companies/ID```
- ```PATCH /companies/ID```
- ```DELETE /companies/ID```
- ```POST /companies/ID/image```
- ```DELETE /companies/ID/image/IMAGE_NAME```
- ```GET /contacts/ID```
- ```PATCH /contacts/ID```
  
### Авторизация
```GET /auth```

Параметры запроса
```
user=USERNAME
```

Ответ:
```
HTTP 200 OK
Authorization: Bearer _token_
```

Пример:
```
$ curl -v -X GET http://135.181.35.61:2112/auth?user=USERNAME
```

### Получениие инфо об организации
```GET /companies/ID```

Ответ:
```
HTTP 200 OK

{
   "id":"12",
   "contactId": "16",
   "name":"ООО Фирма «Перспективные захоронения»",
   "shortName":"Перспективные захоронения",
   "businessEntity":"ООО",
   "contract": {
      "no":"12345",
      "issue_date":"2015-03-12T00:00:00Z"
   },
   "type": [
      "agent",
      "contractor"
   ],
   "status":"active",
   "photos": [
      {
         "name":"0b8fc462dcabf7610a91.jpg",
         "filepath":"http://135.181.35.61:2112/0b8fc462dcabf7610a91.jpg",
         "thumbpath":"http://135.181.35.61:2112/0b8fc462dcabf7610a91_160x160.jpg"
      }
   ],
   "createdAt":"2020-11-21T08:03:00Z",
   "updatedAt":"2020-11-23T09:30:00Z"
}
```

Пример:
```
$ curl -X GET http://135.181.35.61:2112/companies/12  -H "Content-Type: application/json"  -H "Authorization: Bearer _token_"
```

### Обновление данных организации

```PATCH /companies/ID```

Параметры запроса
```
Content-Type: application/json
Authorization: Bearer _token_

{
    "name": _UPDATED_NAME_STR_,
    "shortName": _UPDATED_SHORTNAME_STR_,
    "businessEntity": _UPDATED_BUSINESS_ENTITY_STR_,
    "contract": {
        no:  _UPDATED_CONTRACT_NO_STR_,
        issue_date:  _UPDATED_CONTRACT_ISSUE_DATE_DATE_,
    },
    type: _UPDATED_TYPES_ARRAY_
}

```

Пример:
```
$ curl -X PATCH http://135.181.35.61:2112/companies/12  -H "Content-Type: application/json"  -H "Authorization: Bearer _token_" -d '{"name":"ООО Фирма «Крайне Перспективные Захоронения»", "shortName":"КПЗ"}'
```

### Удаление организации

```DELETE /companies/ID```

Ответ:
```
HTTP 200 OK
```

### Добавление изображения
```POST /companies/ID/image```

Параметры запроса
```
Content-Type: multipart/form-data
Authorization: Bearer _token_

file=FILE
```

Ответ:
```
HTTP 200 OK

{
   "name":"24a7b93b9adc015fdb06.png",
   "filepath":"http://135.181.35.61:2112/images/vera/24a7b93b9adc015fdb06.png",
   "thumbpath":"http://135.181.35.61:2112/images/vera/24a7b93b9adc015fdb06_160x160.png"
}
```

Пример:
```
curl -v -X POST http://135.181.35.61:2112/companies/12/image  -H "Content-Type: multipart/form-data"  -H "Authorization: Bearer _token_" -F "file=@/path/to/file.png"
```

### Удаление изображения

```DELETE /companies/ID/image/IMAGE_NAME```

Ответ:
```
HTTP 200 OK
```
Пример:
```
curl -v -X DELETE http://135.181.35.61:2112/companies/12/image/6387dd7ab672f0acedc9.jpg -H "Authorization: Bearer _token_"
```

### Получение контакта организации
```GET /contacts/ID```

Ответ:
```
HTTP 200 OK

{
   "id":"16",
   "lastname":"Григорьев",
   "firstname":"Сергей",
   "patronymic":"Петрович",
   "phone":"79162165588",
   "email":"grigoriev@funeral.com",
   "createdAt":"2020-11-21T08:03:26.589Z",
   "updatedAt":"2020-11-23T09:30:00Z"
}
```

Пример:
```
curl -v -X GET http://135.181.35.61:2112/contacts/16  -H "Content-Type: application/json"  -H "Authorization: Bearer _token_"
```

### Обновление контакта организации

```PATCH /contacts/ID```

Параметры запроса
```
Content-Type: application/json
Authorization: Bearer _token_

{
   "lastname":"Григорьев",
   "firstname":"Сергей",
   "patronymic":"Петрович",
   "phone":"79162165588",
   "email":"grigoriev@funeral.com",
}
```

Пример:
```
curl -v -X PATCH http://135.181.35.61:2112/contacts/16  -H "Content-Type: application/json"  -H "Authorization: Bearer _token" -d '{"phone":"79162165556"}'
```