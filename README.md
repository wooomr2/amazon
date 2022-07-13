## Deploy 주소
https://amazon-wooomr2.vercel.app

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
## Stripe, StripeCLI, Webhook
- stripeCLI 구동 후 Access granted 된 후에 데이터 접근 가능 
--> firebase Admin과 결제정보 연동

- ./stripe login

- stripe listen --forward-to localhost:3000/api/webhook

- vercel 결제연동 시 timeout 걸려서 사용 일시 중단 중