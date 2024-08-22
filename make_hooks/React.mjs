let hooks = [], //hook을 배열로 관리
  currentHook = 0;

const MyReact = {
  render(Component) {
    const Comp = Component();
    Comp.render();
    currentHook = 0; // 초기화 필수
    return Comp;
  },
};

// useState
export const useState = (initialValue) => {
  // 현재 훅에 값이 없다면 initialValue를 넣어줘라.
  hooks[currentHook] = hooks[currentHook] || initialValue;

  const hookIndex = currentHook;

  const setState = (newState) => {
    if (typeof newState === "function") {
      // 함수를 전달 받았다면?
      hooks[hookIndex] = newState(hooks[hookIndex]);
    } else {
      hooks[hookIndex] = newState;
    }
  };

  return [hooks[currentHook++], setState]; // 다음 index에 state 저장 할 수 있게 currentHook++
};

// useEffect
export const useEffect = (callback, depArray) => {
  // useEffect는 콜백함수와 의존성 배열을 받아온다.
  const hasNoDeps = !depArray; // 의존성배열 여부 확인

  // 이전에 저장한 deps가 있는지 확인
  const prevDeps = hooks[currentHook] ? hooks[currentHook].deps : undefined;

  // 이전에 저장한 cleanup 함수가 있는지 확인
  const prevCleanup = hooks[currentHook]
    ? hooks[currentHook].cleanup
    : undefined;

  const hasChangedDeps = prevDeps
    ? // 배열 요소를 하나씩 검사하여 모두 일치하는지 확인
      !depArray.every((el, i) => el === prevDeps[i])
    : true;

  // 의존성배열이 없거나 변경이 감지되면 실행
  if (hasNoDeps || hasChangedDeps) {
    if (prevCleanup) prevCleanup(); // 이전 클린업함수가 있다면 실행

    const cleanup = callback(); // 클린업함수 저장

    // hooks배열에 deps와 cleanup함수 저장
    hooks[currentHook] = { deps: depArray, cleanup };
  }
  currentHook++;
};

export default MyReact;
