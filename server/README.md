## RESTful API using MongoDB & Mongoose & Express

```
$ npm install
$ node app.js
```

### API 목록
| ROUTE               | METHOD | DESCRIPTION            |
| ------------------- | ------ | ---------------------- |
| /api/todos          | GET    | 모든 todo 데이터 조회  |
| /api/todos/:todo_id | GET    | _id 값으로 데이터 조회 |
| /api/todos          | POST   | todo 데이터 생성       |
| /api/todos/:todo_id | PUT    | todo 데이터 수정       |
| /api/todos/:todo_id | DELETE | todo 데이터 제거       |

