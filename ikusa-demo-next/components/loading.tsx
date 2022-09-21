import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";

import { loaderData, MOBILE_WIDTH } from "~/config/contants";
import { disableScroll, enableScroll } from "~/utils/helpers";

const Loading=(props: { callback: Function|void }|undefined) => {
  const { callback }=props||{};

  const loading=useRef<HTMLDivElement>(null);

  let timeOut=null as NodeJS.Timeout|null;

  const [isLoading, setLoading]=useState(true);
  const [scale, setScale]=useState(1);

  const start=useCallback(() => {
    console.log("1")
    disableScroll(0);
    setLoading(true);
    const CONTENT_WIDTH=1024;
    // Calculate loading item scale if needed only for mobile screen
    if (window.innerWidth<MOBILE_WIDTH) {
      setScale(window.innerWidth/CONTENT_WIDTH);
    }

    startAnimation();
  }, [])

  const startAnimation=() => {
    const loadingEl=loading.current as Element;
    timeOut=setInterval(() => {
      if (!document.hidden) {
        animate(loadingEl);
      }
    }, 1550);
    animate(loadingEl);
  };

  const animate=(loadingEl: ParentNode) => {
    if (loadingEl) {
      const loadingItems=loadingEl.querySelectorAll(".item");
      loadingItems.forEach((load, index) => {
        const item=load as HTMLDivElement;
        setTimeout(() => {
          for (let i=1; i<=50; i++) {
            const { x, y }=
              loaderData.frames[`loader_anim_0${i<10? "0"+i:i}`].frame;
            setTimeout(() => {
              item.style.backgroundPosition=`-${x}px -${y}px`;
            }, (1800/60)*i);
          }
        }, 300*index);
      });
    }
  };

  const finish=() => {
    timeOut&&clearInterval(timeOut);
    document.body.classList?.remove("loading");
    end();
  };

  const end=() => {
    const doc=document.getElementById("main");

    enableScroll(0);
    setLoading(false);
    // animation p-index
    if (doc?.classList.contains("p-index")) {
      doc?.classList.add("animated");
      doc.addEventListener("animationend", (e) => {
        const item=e?.target as HTMLDivElement;
        if (item.classList.contains("animated")) {
          item.classList?.remove("p-index", "animated");
          callback&&callback();
        }
      });
    } else {
      callback&&callback();
    }
  };

  const html=() => (
    <div
      ref={loading}
      className="loading-content w-full h-full fixed bg-black top-0 left-0 right-0 bottom-0 opacity-100 flex items-center justify-center pointer-events-none transition-opacity z-[999]"
      style={{ transform: `scale(${scale})` }}
    >
      {
        isLoading? <div id="loading" className="loading-content__wrap w-[520px] flex justify-center">
          <div className="item w-[100px] h-[150px] mx-[15px] bg-[url(~assets/images/loading/loader.png)] bg-no-repeat bg-[position:1000px_1000px]" />
          <div className="item w-[100px] h-[150px] mx-[15px] bg-[url(~assets/images/loading/loader.png)] bg-no-repeat bg-[position:1000px_1000px]" />
          <div className="item w-[100px] h-[150px] mx-[15px] bg-[url(~assets/images/loading/loader.png)] bg-no-repeat bg-[position:1000px_1000px]" />
          <div className="item w-[100px] h-[150px] mx-[15px] bg-[url(~assets/images/loading/loader.png)] bg-no-repeat bg-[position:1000px_1000px]" />
        </div>
          :''
      }
    </div>
  );

  return {
    html,
    start,
    finish,
  };
};

export default Loading;
