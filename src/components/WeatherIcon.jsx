const WeatherIcon = ({ id, icon }) => {
  let isDay = !icon?.includes?.("n");

  if (id === 200 || id === 201 || id === 202) {
    if (isDay) return <img src="/images/wicon/200_2.png" alt="200_2" />;
    else return <img src="/images/wicon/200_2n.png" alt="200_2n" />;
  } else if (id === 210 || id === 211 || id === 212 || id === 221) {
    if (isDay) return <img src="/images/wicon/210_21.png" alt="210_21" />;
    else return <img src="/images/wicon/200_2n.png" alt="200_2n" />;
  } else if (id === 230 || id === 231 || id === 232) {
    return <img src="/images/wicon/230_32.png" alt="230_32" />;
  } else if (
    id === 300 ||
    id === 301 ||
    id === 302 ||
    id === 310 ||
    id === 311 ||
    id === 312 ||
    id === 313 ||
    id === 314 ||
    id === 321
  ) {
    return <img src="/images/wicon/3xx.png" alt="3xx" />;
  } else if (
    id === 500 ||
    id === 501 ||
    id === 502 ||
    id === 503 ||
    id === 504
  ) {
    if (isDay) return <img src="/images/wicon/500_10.png" alt="500_10" />;
    else return <img src="/images/wicon/500_10n.png" alt="500_10n" />;
  } else if (id === 511) {
    if (isDay) return <img src="/images/wicon/511.png" alt="511" />;
    else return <img src="/images/wicon/511n.png" alt="511n" />;
  } else if (id === 520 || id === 521 || id === 522 || id === 532) {
    if (isDay) return <img src="/images/wicon/520_31.png" alt="520_32" />;
    else return <img src="/images/wicon/520_31n.png" alt="520_32n" />;
  } else if (
    id === 600 ||
    id === 601 ||
    id === 602 ||
    id === 611 ||
    id === 612 ||
    id === 613 ||
    id === 615 ||
    id === 616 ||
    id === 620 ||
    id === 621 ||
    id === 622
  ) {
    return <img src="/images/wicon/6xx.png" alt="6xx" />;
  } else if (
    id === 701 ||
    id === 711 ||
    id === 721 ||
    id === 731 ||
    id === 741 ||
    id === 751 ||
    id === 761 ||
    id === 762 ||
    id === 771 ||
    id === 781
  ) {
    return <img src="/images/wicon/7xx" alt="7xx" />;
  } else if (id === 800) {
    if (isDay) return <img src="/images/wicon/800.png" alt="800" />;
    else return <img src="/images/wicon/800n.png" alt="800n" />;
  } else if (id === 801) {
    if (isDay) return <img src="/images/wicon/801.png" alt="801" />;
    else return <img src="/images/wicon/801n.png" alt="801n" />;
  } else if (id === 802 || id === 803 || id === 804) {
    if (isDay) return <img src="/images/wicon/802_4.png" alt="802_4" />;
    else return <img src="/images/wicon/802_4n.png" alt="802_4n" />;
  } else return <div className="text-center">loading</div>;
};

export default WeatherIcon;
