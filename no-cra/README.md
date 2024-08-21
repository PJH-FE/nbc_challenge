# no_cra

CRA 사용 없이 React 환경 구축하기.

## 진행 순서 정리해보기

1. index.html 생성 후 div#root 생성
   <br/><br/>

2. React와 ReactDOM CDN 추가
   `javascript
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

   `
   <br/>

3. Script Tag 작성 => JSX문법 사용 불가하여 React문법으로 작성

   ```javascript
   const App = () => {
     return React.createElement("h1", null, "Hello, World!");
     // React.createElement("태그", props, children);
   };
   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(React.createElement(App));
   ```

   <br/>

4. JSX 사용을 위해 Babel 설치

   ```javascript
   <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
   ```

   <br/>

5. Script Tag 수정 => 브라우저에서 트랜스파일 하지 말라는 Warning 출력

   ```javascript
   <script type="text/babel">
     const App = () => {
        return <h1>Hello, World!</h1>;
      };
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
   ```

   <br/>

6. npm초기화 및 패키지 설치
   > npm init -y
   > npm install --save-dev @babel/core @babel/cli @babel/preset-react

<br/>

7.  .babelrc 파일 생성
    > {
        "presets": ["@babel/preset-react"]
        }

<br/>

8.  package.json에 build 스크립트 입력
    > "scripts": {
        "build": "babel src -d dist"
    },

<br/>

9. src폴더 생성후 app.js 생성 & App 생성 소스 옮기기

<br/>

10. npm run build 실행 => dist폴더에 app.js 생성됨

<br/>

11. index.html에 기존 Script Tag 제거후 아래 소스 추가
    ```javascript
    <script src="./dist/app.js" type="module"></script>
    ```
    <br/>
