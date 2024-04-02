
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
## /users/management
### page.tsx
``` javasciprt
"use client";

export default function UserManagement() {
  // client 사이드에서 처리
  if (typeof window !== "undefined") {
    // 검색폼에서 선택된 유저들
    const { usernames } = useManageUsers();

    const router = useRouter();

    // 선택된 유저가 없을 시 이전 페이지, 있을시 배열 중 첫번째 유저 선택 후 라우팅 처리
    if (!usernames || !usernames.length) {
      toast.message("선택된 유저가 없습니다.");
      router.back();
    } else {
      router.push(`/users/management/${usernames![0]}`); 
    }
  }

  return null;
}

```  
## /users/management/[username]  
### page.tsx
SSR + FCP 개선을 위해 공식문서( https://tanstack.com/query/v4/docs/framework/react/guides/ssr )에 따라 prefetching 진행  

``` javascript
"use client"

type UserProps = {
  params: {
    username: string;
  };
};

export default async function User({ params }: UserProps) {
  const { username } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.USER, username],
    queryFn: () => fetchUserBySearchTerm({ searchTerm: username }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <section className={styles.contents}>
          <TabList />
          <Suspense fallback={<UserDetailsSkeleton />}>
            <UserDetails />
          </Suspense>
        </section>
      </HydrationBoundary>
    </div>
  );
}

```  
## UserDetails ( 페이지네이션, 연관 데이터 테이블 )  
### UserDetails.tsx  
``` javascript

export default function UserDetails() {
  // 현재 선택된 유저, 초기값 usernames[0]이나 TabList에서 조정 가능
  const username = getUsernameByPath();

  // SSR UI 트리, CLIENT UI 트리가 조건문으로 인하여 달라짐, CSR 설정
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // username에 따라 새로운 데이터를 불러옴
  const {
    data,
    error,
    refetch,
    isLoading,
    isError,
    isRefetching,
    isRefetchError,
  } = useQuery({
    queryKey: [QueryKeys.USER, username],
    queryFn: () => fetchUserBySearchTerm({ searchTerm: username }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
  });

  useHandleError({ error, isError, isRefetchError, fieldName: "유저" });

  // API에서 mongoose의 find 메소드를 사용 중 이므로 [user] || [], 알맞게 처리
  const user = data ? data[0] : null;
  const memoUser = useMemo(() => user, [user]);

  if (!isClient) return null;

  if (isLoading) return <UserDetailsSkeleton />;

  if (!data) return null;

  return (
    <main className={styles.container}>
      <UserDetailsHeader />
      <div className={styles.contents}>
        {memoUser && (
          <div className={styles.contentsWrap}>
            <UserProfile
              imageUrl={memoUser.imageUrl}
              username={memoUser.username}
            />
            <UserDetailsInfo
              grade={memoUser.grade}
              username={memoUser.username}
              email={memoUser.email}
              status={memoUser.status}
              createdAt={memoUser.createdAt}
            />
            <UserLogs
              userId={memoUser.id}
              createdAt={memoUser.createdAt}
              updatedAt={memoUser.updatedAt}
            />
          </div>
        )}
      </div>
      {isError && (
        <ApiRefetch
          isError={isError}
          refetch={refetch}
          isRefetching={isRefetching}
          isRefetchError={isRefetchError}
        />
      )}
    </main>
  );
}

export const UserDetailsSkeleton = () => (
  <div className={styles.container}>
    <UserDetailsHeaderSkeleton />
    <div className={styles.contents}>
      <div className={styles.contentsWrap}>
        <UserProfileSkeleton />
        <UserDetailsInfoSkeleton />
        <UserLogsSkeleton />
      </div>
    </div>
  </div>
```  
### 커스텀 페이지네이션  
Pagination과 Filter & SearchTerm & Sort에 공통적으로 사용되는 로직과 컴포넌트들은 확장 가능성을 고려하여 공용 컴포넌트와 훅들로 분리하여 모든 Paginated Data Table에 성공적으로 적용하였습니다.  
``` javascript
// UserPostLogs.tsx

// FAQ(미구현)
export default function UserPostLogs({ userId }: { userId: string }) {
  const { currTab, setCurrTab } = useTabList();

  const renderContents = currTab === "리뷰" ? <ReviewLogs userId={userId} /> : <FAQLogs />;

  return (
    <div className={styles.postLogs}>
      <div className={styles.postLogsWrap}>
        <h1>고객 참여 활동</h1>
        <div className={styles.setTab}>
          <h1 className={styles.currTab}>{currTab}</h1>
          <PostLogsTabList currTab={currTab} setCurrTab={setCurrTab} />
        </div>
        {renderContents}
      </div>
    </div>
  );
}
```  

``` javascript
// ReviewLogs.tsx

export default function ReviewLogs({ userId }: { userId: string }) {
  // 검색 조건들과 refetch를 force시키는 enabled state
  const { filter, searchTerm, sort, enabled, setEnabled } =
    creatorFilterReviews();
  // 재사용 가능한 페이지네이션 커스텀 훅
  const {
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleSetPage,
    handleMoveToFirstPage,
    handleMoveToLastPage,
  } = useCreatorPagination();
  // 페이지 이동시 컨테이너로 스크롤 이동
  const { scrollRef } = useScrollRef({ currentPage });

  // 검색 조건과 페이지에 따라 데이터 fetching
  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery<ReviewData>({
    queryKey: [QueryKeys.USER_REVIEW, currentPage],
    queryFn: () =>
      fetchUserReviews({
        pageNum: currentPage,
        filter,
        searchTerm,
        userId,
        sort,
      }),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled,
  });

  useHandleError({ error, isError, fieldName: "리뷰" });

  // 현재 페이지, sort 옵션 변경시 force refetch
  useEffect(() => {
    setEnabled(true);
  }, [currentPage, sort]);

  // enabled 감지 후 refetch()
  useEffect(() => {
    if (enabled) {
      refetch();
    }
  }, [enabled]);

  // 데이터 fetching 성공 시 setEnabled(false)
  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
    }
  }, [isSuccess]);

  // Hydration 에러 방지
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isLoading) return <DataTableSkeleton />;

  if (isSuccess && !data?.reviews?.length)
    return (
      <NoContent
        queryKey={[QueryKeys.USER_REVIEW, userId]}
        refetch={refetch}
        error={error}
        isRefetching={isRefetching}
        isRefetchError={isRefetchError}
        fieldName="리뷰"
      />
    );

  if (isSuccess && data?.reviews?.length) {
    return (
      <div ref={scrollRef}>
        <FilterReviewLogs />
        <ReviewLogTable
          userId={userId}
          isLoading={isLoading}
          reviews={data.reviews as ReviewLogs}
          dataLength={data?.pagination.totalReviews}
          currentPage={currentPage}
        />
        <PaginateControl
          pageTotal={data?.pagination?.totalPages}
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleSetPage={handleSetPage}
          handleMoveToFirstPage={handleMoveToFirstPage}
          handleMoveToLastPage={handleMoveToLastPage}
        />
      </div>
    );
  }
}

```  
  Enabled로 force-refetch

  Enabled로 Handling 하는 이유,
  Filter를 선택 후 검색해야함 
  ( 예: 리뷰 내용 필터 선택 후 리뷰 내용 입력, 책 제목 선택 후 책 제목 입력 )

  즉 Filter & SearchTerm 둘 다 의미있는 값이 존재해야하나 이를 상태로 정의하려면 명확하지 않다
  유저의 Submit Event를 받는 시점에 enabled을 true로 설정하여 리패칭 유도  
  
```javascript
// use-filter.ts ( zustand )
// SORT -> <T, S> 등으로 확장 가능
// FILTER -> T 제네릭을 받아 타입 확장

interface CreatorUseFilterReviews<T> {
  sort: "최신순" | "오래된순";
  filter: T;
  searchTerm: string;
  enabled: boolean;
  setSort: (sort: "최신순" | "오래된순") => void;
  setFilter: (filter: T) => void;
  setSearchTerm: (searchTerm: string) => void;
  setEnabled: (param: boolean) => void;
  resetSearchState: () => void;
}

export const creatorFilter = <T>(initialFilter: T) =>
  create<CreatorUseFilterReviews<T>>((set) => ({
    sort: "최신순",
    filter: initialFilter,
    searchTerm: "",
    enabled: true,
    setSort: (sort: "최신순" | "오래된순") =>
      set({
        enabled: false,
        sort,
      }),
    setFilter: (filter: T) =>
      set({
        enabled: false,
        filter,
      }),
    setSearchTerm: (searchTerm: string) =>
      set({
        enabled: false,
        searchTerm,
      }),
    setEnabled: (enabled: boolean) => {
      set({
        enabled,
      });
    },
    resetSearchState: () =>
      set({
        enabled: true,
        sort: "최신순",
        filter: initialFilter,
        searchTerm: "",
      }),
  }));

// T 제네릭 활용하여 유저 포인트, 도서, 유저 리뷰 컴포넌트에 활용
export const creatorFilterPoints =
  creatorFilter<PointFilterOption>("검색 옵션");

export const creatorFilterReviews = creatorFilter<FilterOption>("검색 옵션");

export const creatorFilterBooks = creatorFilter<BookFilterOption>("통합검색");

```  
Filter & SearchTerm 처리 방식  
``` javascript
  // 컴포넌트 활용법

  // Store에서 정의한 타입과 동일한 값들을 Item으로 가진 배열 생성
  // 예: creatorFilterReviews 사용시 FilterOption[]
  const filterOptions: FilterOption[] = [
    "검색 옵션",
    "리뷰 ID",
    "리뷰 내용",
    "책 제목",
  ];

  // 사용할 Filter & SearchTerm Store State
  const props = creatorFilterReviews();

  // 커스텀 훅에 props로 전달
  // 해당 상태를 기반으로 search-form에 필요한 값, 함수들을 받는다
  const {
    show,
    toggleShow,
    handleSearch,
    handleReset,
    filter,
    setFilter,
    setShow,
    searchTerm,
    handleSubmit,
  } = useFilter<FilterOption>(props);
```  
``` javascript
// use-filter.ts ( custom-hook )

// zustand interface와 동일하다
interface UseFilterProps<T> {
  sort: "최신순" | "오래된순";
  filter: T;
  searchTerm: string;
  enabled: boolean;
  setSort: (sort: "최신순" | "오래된순") => void;
  setFilter: (filter: T) => void;
  setSearchTerm: (searchTerm: string) => void;
  setEnabled: (param: boolean) => void;
  resetSearchState: () => void;
}

export function useFilter<T>(props: UseFilterProps<T>) {
  const {
    filter,
    setFilter,
    sort,
    setSort,
    searchTerm,
    setSearchTerm,
    resetSearchState,
    setEnabled,
  } = props;

  // sort와 filter는 select ui로 구성, 아이템 선택시 열림, 닫힘의 상태가 필요하다
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => setShow((prev) => !prev), []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // sort 변경 시 상위 컴포넌트의 useEffect에서 enabled -> true
  const handleSort = useCallback((sort: "최신순" | "오래된순") => {
    setSort(sort);
    setShow(false);
  }, []);

  const handleReset = useCallback(() => {
    resetSearchState();
    setShow(false);
  }, []);

  // 클라이언트가 필터와 검색어를 입력한 뒤 Submit Event 처리
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (filter && searchTerm.trim() === "") {
      toast.message("검색어를 입력해주세요.");
    }

    // 해당 filter와 searchTerm은 전역 상태로써 상위 컴포넌트에 전달 가능하다
    setEnabled(true);
  };

  useEffect(() => {
    setShow(false);
  }, [filter, sort]);

  useEffect(() => {
    handleReset();
  }, []);

  return {
    show,
    setShow,
    toggleShow,
    sort,
    handleSort,
    handleSearch,
    handleReset,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    handleSubmit,
  };
}
```  
