import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color } from "../theme/color";
import { spacing } from "../theme/spacing";

interface IContainerOffset {
  height: number
  width: number
}

export const SmallAlert = styled(({ className, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [c, setContainerOffset] = useState<IContainerOffset | null>(null)
  useEffect(() => {
    const container = containerRef.current
    if(container){
      setContainerOffset({
        height: container.offsetHeight,
        width: container.offsetWidth
      })
    }
  }, [])
  return (
    <div className={className} ref={containerRef}>
      {c &&
        <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${c.width} ${c.width}`}>
          <polygon className='border' points={`56 13 56 10 37 10 27 0 0 0 0 27 10 37 10 ${c.height - 37} 0 ${c.height - 27} 0 ${c.height} 27 ${c.height} 37 ${c.height - 10} 56 ${c.height - 10} 56 ${c.height - 13} 13 ${c.height - 13} 13 13 56 13`}/>
          <polygon className='border' points={`${c.width - 56} 13 ${c.width - 56} 10 ${c.width - 37} 10 ${c.width - 27} 0 ${c.width} 0 ${c.width} 27 ${c.width - 10} 37 ${c.width - 10} ${c.height - 37} ${c.width} ${c.height - 27} ${c.width} ${c.height} ${c.width - 27} ${c.height} ${c.width - 37} ${c.height - 10} ${c.width - 56} ${c.height - 10} ${c.width - 56} ${c.height - 13} ${c.width - 13} ${c.height - 13} ${c.width - 13} 13 ${c.width - 56} 13`}/>
        </svg>
      }
      <div className="content-region">
        {children}
      </div>
    </div>
  )
})`
position: relative;
padding: 13px;
display: flex;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .border {
    fill: ${color('primary.400')};
  }
  .content-region {
    background-color: ${color('primary.700', 0.8)};
    backdrop-filter: blur(5px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > * {
      color: ${color('primary.50')};
    }
  }
`