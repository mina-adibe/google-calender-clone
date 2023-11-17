import { useLayoutEffect, useRef, useState } from "react";
import { OverflowContainerProps } from "./types";

function OverflowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) {
  const [overFlowAmount, setOverFlowAmount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect is used to get the correct width of the container
  useLayoutEffect(() => {
    if (containerRef.current == null) return;

    // implement resizeobserver api to get the width of the container
    const resizeObserver = new ResizeObserver((entries) => {
      const containerElement = entries[0].target as HTMLDivElement;
      if (containerElement == null) return;
      // select data item in the container
      const dataItems = containerElement.querySelectorAll<HTMLElement>("[data-item]");

      let overflowAmount = 0;

      // select data overflow element in the container and set the display to none
      const overflowElement =
        containerElement.parentElement?.querySelector<HTMLElement>("[data-overflow]");
      if (overflowElement != null) overflowElement.style.display = "none";

      dataItems.forEach((child) => child.style.removeProperty("display"));

      // loop through the dataItems  and check if the dataItem is overflowing
      for (let i = dataItems.length - 1; i >= 0; i--) {
        const child = dataItems[i];
        if (containerElement.scrollHeight <= containerElement.clientHeight) {
          break;
        }

        overflowAmount = dataItems.length - i;

        child.style.display = "none";
        overflowElement?.style.removeProperty("display");
      }

      setOverFlowAmount(overflowAmount);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [items]);

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div data-overflow>{renderOverflow(overFlowAmount)}</div>
    </>
  );
}

export default OverflowContainer;
