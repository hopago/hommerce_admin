import { useEffect, useRef, useState } from "react";

export const useScrollRef = ({ currentPage }: { currentPage: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setFirstRender(false);
  }, [currentPage]);

  return {
    scrollRef,
  };
};
