
메일 인증 요청 API
POST /api/auth/email/otp/request
Request body
{
  "email": "test@naver.com"
}
Response body
{
  "message": "인증 코드가 전송되었습니다."
}

메일 인증 확인 API
POST /api/auth/email/otp/verify
Request body
{
  "email": "test@naver.com",
  "code": "123456"
}
Response
{
  "data": {
    "verificationToken": "3575be60-421b-43de-89f3-cc785ab21202",
    "expiresInSeconds": 600
  },
  "message": "인증 코드가 확인되었습니다."
}

회원가입
POST /api/auth/signup
Request body
{
  "email": "test@naver.com",
  "password": "test1234",
  "name": "test",
  "emailVerificationToken": "3575be60-421b-43de-89f3-cc785ab21202"
}
Response
{
  "data": {
    "userId": 111,
    "message": "회원가입이 완료되었습니다. "
  }
}

로그인
POST /api/auth/login
Request body
{
  "email": "test@naver.com",
  "password": "test1234"
}
Response
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTEiLCJlbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NTg4MTcwNDcsImV4cCI6MTc1ODgxODg0N30.EvASMj_lJYjDPHNveyg8dvvhAdDKWOr-p8v9ObMo1eQ",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTEiLCJqdGkiOiJhNjAxNWY0My04ODc2LTRmNGEtODU3MS0zYzdjOWM4NWVjNjAiLCJpYXQiOjE3NTg4MTcwNDcsImV4cCI6MTc2MDAyNjY0N30.5yNCvZrFdI_x5bort0dJUNQjdiW042wWCDcLnWqhRoU"
  }
}

카카오 알림톡 템플릿 생성 API
POST /api/templates
Request body
{
  "requestContent": "[과제 안내] 안녕하세요, 발신 스페이스입니다. 과제 관련 안내드립니다.  ✏️ 수업명 : 수업명 ✏️ 과제명 : 과제명  추가 메시지"
}
Response
{
  "data": {
    "id": null,
    "userId": 111,
    "categoryId": "004001",
    "title": "학원 안내 (부분 완성)",
    "content": "안녕하세요. 발신 스페이스입니다. 과제 관련 안내드립니다.\n\n▶ 수업명 : #{수업명}\n▶ 과제명 : #{과제명}\n\n#{추가메시지}\n\n문의사항은 발신 스페이스 고객센터로 연락주시기 바랍니다.\n",
    "imageUrl": null,
    "type": "MESSAGE",
    "isPublic": null,
    "status": null,
    "createdAt": null,
    "updatedAt": null,
    "buttons": [
      {
        "id": 1,
        "name": "자세히 보기",
        "ordering": 1,
        "linkPc": "https://example.com",
        "linkAnd": null,
        "linkIos": null
      }
    ],
    "variables": [
      {
        "id": 3,
        "variableKey": "수업명",
        "placeholder": "#{수업명}",
        "inputType": "TEXT"
      }
    ],
    "industries": [
      {
        "id": 1,
        "name": "학원"
      }
    ],
    "purposes": [
      {
        "id": 2,
        "name": "공지/안내"
      }
    ],
    "_mapped_variables": null
  }
}


템플릿 목록 조회 API
GET /api/templates
Request body
{
  "page": 1,
  "size": 1,
  "status": "APPROVE_REQUESTED"
}
Response
{
  "data": {
    "items": [
      {
        "id": 32027,
        "userId": 111,
        "categoryId": "999999",
        "title": "상품 광고",
        "content": "#{회원명}님, 최신 상품을 만나보세요.\n상품명: #{상품명}\n가격: #{가격}",
        "imageUrl": null,
        "type": "MESSAGE",
        "isPublic": true,
        "status": "APPROVE_REQUESTED",
        "createdAt": "2025-09-17T18:22:48",
        "updatedAt": "2025-09-25T08:21:18",
        "buttons": [],
        "variables": [],
        "industries": [],
        "purposes": []
      },
      {
        "id": 32031,
        "userId": 111,
        "categoryId": "004001",
        "title": "학원 안내",
        "content": "안녕하세요. 발신 스페이스입니다. 과제 관련 안내드립니다.\n\n▶ 수업명 : #{수업명}\n▶ 과제명 : #{과제명}\n\n#{추가메시지}\n\n문의사항은 발신 스페이스로 연락주시기 바랍니다. 감사합니다.\n",
        "imageUrl": null,
        "type": "LINK",
        "isPublic": null,
        "status": "APPROVE_REQUESTED",
        "createdAt": "2025-09-25T08:21:59",
        "updatedAt": "2025-09-25T08:22:14",
        "buttons": [
          {
            "id": 20103,
            "name": "문의하기",
            "ordering": 1,
            "linkPc": "https://jober.io/#{link}",
            "linkAnd": null,
            "linkIos": null
          }
        ],
        "variables": [
          {
            "id": 88013,
            "variableKey": "추가메시지",
            "placeholder": "#{추가메시지}",
            "inputType": "TEXT"
          },
          {
            "id": 88014,
            "variableKey": "과제명",
            "placeholder": "#{과제명}",
            "inputType": "TEXT"
          },
          {
            "id": 88015,
            "variableKey": "수업명",
            "placeholder": "#{수업명}",
            "inputType": "TEXT"
          }
        ],
        "industries": [
          {
            "id": 1,
            "name": "학원"
          }
        ],
        "purposes": [
          {
            "id": 2,
            "name": "공지/안내"
          }
        ]
      }
    ],
    "page": 1,
    "size": 10,
    "total": 2
  }
}


템플릿 승인 요청 API
POST /api/templates/{id}/approve-request
Request body
Response
{
  "data": {
    "templateId": 32035,
    "status": "APPROVE_REQUESTED"
  }
}


