
# Hommerce

## 빌드 정보
![App screenshot](https://i.imgur.com/WAmXnSl.png)

## Google PageSpeed Insights
![App screenshot](https://i.imgur.com/Ny9VcpY.png)
## 전체 흐름도

![App Screenshot](https://i.imgur.com/YRsqCdk.png)

## ADMIN
### package.json
``` json
{
  "name": "admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@nextui-org/react": "^2.2.10",
    "@tanstack/react-query": "^5.25.0",
    "@uploadthing/react": "^6.4.0",
    "axios": "^1.6.7",
    "clsx": "^2.1.0",
    "date-fns": "^3.3.1",
    "framer-motion": "^11.0.8",
    "lodash.debounce": "^4.0.8",
    "next": "14.1.0",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "^4.11.0",
    "recharts": "^2.9.0",
    "sonner": "^1.4.3",
    "uploadthing": "^6.6.0",
    "zustand": "^4.5.2"
  },
  "devDependencies": {
    "@tanstack/react-query-devtools": "^5.25.0",
    "@types/lodash.debounce": "^4.0.9",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.1.0",
    "typescript": "^5"
  }
}

```
### .env

```javascript
UPLOADTHING_SECRET=your_secret
UPLOADTHING_APP_ID=your_id
NEXT_PUBLIC_SERVER_URL=your_server_url
NEXT_PUBLIC_UPLOADTHING_SECRET=your_secret
NEXT_PUBLIC_UPLOADTHING_APP_ID=your_id
```


# 폴더 구조

## 전체 폴더 구조
![App Screenshot](https://i.imgur.com/phYh4ml.png)
### Nested 폴더 구조
![App Screenshot](https://i.imgur.com/D4LOgWX.png)

# 컴포넌트 구조
## import
![App Screenshot](https://i.imgur.com/vcf7Pc9.png)
## const
![App Screenshot](https://i.imgur.com/kqAJ45Y.png)
## Query
![App Screenshot](https://i.imgur.com/ZvvDQRL.png)
## useEffect
![App Screenshot](https://i.imgur.com/zrdaWVU.png)
## Features
### /users
    1. API 로컬 테스트 및 변형
    2. 유저 debounced 검색
    3. 커스텀 페이지네이션
    4. 유저 다량 관리 시스템

## Usage
# API 로컬 테스트 및 변형
## 기본 사용법

![App screenshot](https://i.imgur.com/v6XKjHJ.png)

![App screenshot](https://i.imgur.com/7E8NVch.png)

## 데이터 타입 검증

![App screenshot](https://i.imgur.com/g9HIeyJ.png)

### 검증 로직

``` javascript
// BodyInput.tsx
  const { inputValue, handleInputChange, error } = useBodyInput({
    onError: (errMsg: string) => {
      toast.error(errMsg);
    },
  });

// use-body-input.ts
import { create } from "zustand";

type CreatorUseBodyInput = {
  inputValue: string;
  parsedValue: unknown;
  error: boolean;
  errMsg: string | null;
  setInputValue: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetErrorState: () => void;
};

export const useBodyInput = create<CreatorUseBodyInput>((set) => ({
  ...
  handleInputChange: (e) => {
    const value = e.target.value;
    set((state) => {
      state.error = false;
      state.errMsg = null;
      state.setInputValue(value);
      return state;
    });
  },
  setInputValue: (value) =>
    set((state) => {
      state.inputValue = value;
      try {
        const parsedValue = JSON.parse(value);
        return { ...state, parsedValue, error: false, errMsg: null };
      } catch (error) {
        if (state.inputValue.trim() === "")
          return {
            ...state,
            error: false,
            errMsg: null,
          };

        return {
          ...state,
          error: true,
          errMsg: "적합하지 않은 JSON 형식입니다.",
        };
      }
    }),
}));

```

# 유저 debounced 검색
## 기본 사용법
