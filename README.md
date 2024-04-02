
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
## JSX
![App Screenshot](https://i.imgur.com/3aGOBuV.png)
## Features
### /users
    1. API 로컬 테스트 및 변형
    2. 유저 debounced 검색
    3. 커스텀 페이지네이션
    4. 유저 다량 관리 시스템

## Usage
# API 로컬 테스트 및 변형
## 구현 로직
page.tsx

![App screenshot](https://i.imgur.com/StN7NuG.png)

유저 검색 부분  
유저 데이터 테이블  
API info shortcut & execute  
API modal

``` javasciprt
// ApiServices.tsx

type ApiServicesProps = {
  tag: ApiTag;
  title: string;
};

export default function ApiServices({ tag, title }: ApiServicesProps) {
  const specs = getApiSpecsByTag(tag);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {specs.map((spec) => (
        <ApiSpec key={spec.desc} spec={spec} />
      ))}
    </div>
  );
}

```

``` javascript
// getApiSpecsByTag.ts

import { apiSpecs } from "../constants/api-specs";

import { ApiTag } from "../types/api-specs";

export const getApiSpecsByTag = (tag: ApiTag) => {
  const findApiSpecs = apiSpecs.find((ele) => ele.tag === tag);
  if (!findApiSpecs) throw new Error("Invalid tag.");

  return findApiSpecs.endpoints;
};

```

``` javascript
// api-specs.ts

const usersApiSpecs: Endpoints = [
  {
    operationId: "getCurrUser",
    path: "/user",
    method: "GET",
    desc: "현재 사용자 정보 조회",
  },
  {
    operationId: "updateUser",
    path: "/user",
    method: "PATCH",
    desc: "사용자 정보 업데이트",
  },
  {
    operationId: "deleteUser",
    path: "/user",
    method: "DELETE",
    desc: "사용자 삭제",
  },
  {
    operationId: "register",
    path: "/user/session",
    method: "POST",
    desc: "사용자 등록",
  },
];
```

API 서비스 컴포넌트에선 constants인 API 스펙 배열을 불러와 랜더링한다.

``` javascript
// ApiSpec.tsx

type ApiSpecProps = {
  spec: Endpoint;
};

export default function ApiSpec({ spec }: ApiSpecProps) {
  const { setShow, setApiSpecs, setApiEndpoint } = useApiModal();

  const onClick = () => {
    setApiSpecs(spec.operationId);
    setApiEndpoint(spec);
    setShow(true);
  };

  return (
    <div className={styles.apiSpecsContainer}>
      <ApiSpecInfo method={spec.method} path={spec.path} desc={spec.desc} />
      <Button type="button" text="실행" icon={<MdAdd />} onClick={onClick} />
    </div>
  );
}

```

실행 버튼을 누르면 API 스펙과 엔드포인트를 store에 설정해주게 된다.  

``` javascript
// Endpoint는 operationId 프로퍼티를 갖는다.
// operationId라는 key값으로 미리 작성한 API 상세 스펙을 불러온다.

  // constants
  const API_CONSTANTS: Record<ApiOperationIds, ApiInfo> = {
  ...
  updateUser: {
    body: {
      value: {
        _id: "clerk_id",
        imageUrl: "https://example.com",
        username: "new_user_name",
      },
      required: true,
    },
    responses: [
      {
        code: 200,
        desc: "사용자 정보 업데이트 성공",
      },
    ...

  // zustand
  setApiSpecs: (operationId: ApiOperationIds) => {
    const apiConstants = API_CONSTANTS[operationId];
    if (!apiConstants) {
      throw new Error(
        `API_CONSTANTS not found for operationId: ${operationId}`
      );
    }
    set({ apiSpecs: apiConstants });
  },
  setApiEndpoint: (endpoint: Endpoint) => set({ apiEndpoint: endpoint }),

```

전역 세팅 해둔 API 스펙을 컴포넌트에 불러와 execute 로직을 만든다

``` javascript
// ApiModal.tsx

export default function ApiModal() {
  const { show, setShow, apiSpecs, apiEndpoint, resetState } = useApiModal();

  const memoApiSpecs = useMemo(() => apiSpecs, [apiSpecs]);
  const memoApiEndpoint = useMemo(() => apiEndpoint, [apiEndpoint]);

  const { execute, data, isPending, errMsg } = useRequestForm({
    path: apiEndpoint?.path,
    method: apiEndpoint?.method,
    onSuccess: (message?: string) => {
      toast.success(message ?? "요청이 성공적으로 처리 됐습니다.");
    },
    onError: () => {
      toast.error(errMsg);
    },
  });
```

책이나 작가 이미지 등 이미지가 있는 경우가 매우 흔하다.  
이미지가 있을 경우에는 API_CONSTANTS에 hasImage 프로퍼티(optional)를 true로 설정 후 활용하였다.
  
  ![App screenshot](https://i.imgur.com/71I50Py.png)  
오른쪽 카메라 아이콘 클릭 시 이미지 업로드가 가능하다.  

![App screenshot](https://i.imgur.com/twBEkhP.png)  
이미지 업로드 후 모달창을 닫을 때 이미지 파일을 유지/삭제할지 확인한다.  
``` javascript
// use-uploadthing.ts

type UseUploadthingParams = {
  specs: ApiInfo | undefined | null;
};

export const useUploadthing = ({ specs }: UseUploadthingParams) => {
  const [showUpload, setShowUpload] = useState(false);
  const [imgUrls, setImgUrls] = useState<string[] | null>(null);

  const prepareImage = specs?.hasImg;
  const hasImage = imgUrls?.length ?? 0 > 0;

  const showUploadButton = () => {
    setShowUpload(true);
  };

  const handleUploadSuccess = (
    res: ClientUploadedFileData<{
      fileUrl: string;
    }>[]
  ) => {
    toast.message("이미지 업로드를 성공적으로 마쳤어요.");
    const urls = res.map((res) => res.url);
    setImgUrls(urls);
    setShowUpload(false);
  };

  return {
    imgUrls,
    showUpload,
    showUploadButton,
    prepareImage,
    handleUploadSuccess,
    hasImage,
  };
};


// ApiModal.tsx

  const {
    showUpload,
    showUploadButton,
    prepareImage,
    hasImage,
    handleUploadSuccess,
    imgUrls,
  } = useUploadthing({ specs: memoApiSpecs! });

  if (!show || !memoApiSpecs || !memoApiEndpoint) return null;

  const handleClose = async () => {
    if (hasImage) {
      const isConfirm = confirm(
        "이미지가 업로드된 상태에요. 파일을 저장할까요?"
      );

      if (!isConfirm) {
        try {
          await deleteImages(imgUrls!);
        } catch (err: unknown) {
          const { message, status } = err as {
            message: string;
            status: number;
          };

          toast.error(`에러 코드: ${status}, 에러 메시지: ${message}`);
        }
      }
    }
    resetState();
    setShow(false);
  };

  ./jsx

  ...
            {showUpload && (
            <div className={styles.uploadButtonWrap}>
              <UploadButton
                appearance={{
                  button({ ready, isUploading }) {
                    return {
                      fontSize: "0.9rem",
                      color: "black",
                      ...(ready && { color: "#ecfdf5" }),
                      ...(isUploading && { color: "#d1d5db" }),
                    };
                  },
                  container: {
                    marginTop: "1rem",
                  },
                  allowedContent: {
                    color: "#a1a1aa",
                  },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => handleUploadSuccess(res)}
                className="upload-button"
              />
            </div>
          )}
```

## 기본 사용법

![App screenshot](https://i.imgur.com/v6XKjHJ.png)

![App screenshot](https://i.imgur.com/7E8NVch.png)

## 데이터 타입 검증

![App screenshot](https://i.imgur.com/g9HIeyJ.png)

### 검증 로직

``` javascript
// BodyInput.tsx

  // input의 onChange 부분에서 handleInputChnage 사용
  // zustand에서 input value 파싱 후 타입 검증 이후 에러 메시지와 상태 설정
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
  ... 이하 생략
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
# Users & Pagination & Reference Data Table
## 기본 사용법

![App screenshot](https://i.imgur.com/HX7MY0V.png)  
![App screenshot](https://i.imgur.com/s0JXZRv.png)  
![App screenshot](https://i.imgur.com/xq7XP0P.png)  
## 구현 로직  
### 유저 debounced 검색  
인풋값 세팅 로직
``` javascript
// use-debounced-search.ts

export const useDebouncedSearch = () => {
  // 인풋값 핸들링
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // searchTerm이 바뀌면 useDebounce에 전달하여 0.75초 지연 후 인풋값 리턴
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 750 });

  return {
    debouncedSearchTerm,
    handleChange,
    searchTerm,
    setSearchTerm,
  };
};

```  
데이터 fetching 로직  
```javascript
// use-search-form.ts

export const useSearchUserForm = () => {
  const queryClient = useQueryClient();

  // debouncedSearchTerm을 받아온다
  const { debouncedSearchTerm, searchTerm, setSearchTerm, handleChange } =
    useDebouncedSearch();

  // debouncedSearchTerm 쿼리키 세팅, 값이 바뀔 때 마다 새로 fetching
  // 검색어를 지울 경우 다시 요청을 보내지 않는다
  const {
    data: searchResults,
    error,
    isError,
    isLoading,
  } = useQuery<IUser[]>({
    queryKey: [QueryKeys.USER_SEARCH, debouncedSearchTerm],
    queryFn: () => fetchUserBySearchTerm({ searchTerm: debouncedSearchTerm }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!debouncedSearchTerm,
  });

  // 검색어가 비어있을 경우 쿼리 초기화, 이전 검색 결과 랜더링 방지
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      queryClient.resetQueries({
        queryKey: [QueryKeys.USER_SEARCH, debouncedSearchTerm],
      });
    }
  }, [debouncedSearchTerm]);

  // 에러 및 서버 상태 제공
  useHandleError({ error, isError, fieldName: "유저" });

  return {
    searchTerm,
    setSearchTerm,
    handleChange,
    isLoading,
    searchResults,
    error,
  };
};

```  
``` javascript
// UsersSearch.tsx

  // useOutsideClick 연동, container 밖 클릭시 검색창이 닫히고 검색 상태 초기화
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const pathname = getCurrPathname();
  if (!pathname) return null;

  // 1차 관리 페이지 이동, 해당 페이지에선 선택된 유저가 있는지 확인 후 루트를 결정
  const onClick = () => {
    router.push(`/users/management`);
  };

  const {
    searchTerm,
    setSearchTerm,
    handleChange,
    isLoading,
    searchResults,
    error,
  } = useSearchUserForm();

  // 검색 결과에서 관리 대상으로 선택된 유저들
  const { usernames, errMsg, error: manageError } = useManageUsers();

  // 검색 결과를 받아 선택된 유저들을 검색 결과에서 filter
  const filteredResults = useFilterResults({
    searchResults,
    usernames,
    searchTerm,
  });

  // containerRef을 받아 마우스 이벤트 감지
  useOutsideClick({ ref: containerRef, setSearchTerm });

  // 에러 상황 시 토스트 창으로 UI 제공
  useEffect(() => {
    if (manageError && errMsg) {
      toast.error(errMsg);
    }
  }, [manageError, errMsg]);
```
