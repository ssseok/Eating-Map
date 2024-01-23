/*global kakao*/ // 카카오 객체 정의

import Script from 'next/script';

/**
 * window 객체의 kakao 프로퍼티 추가 선언(TS)
 */
declare global {
  interface Window {
    kakao: any;
  }
}
export default function Map() {
  /**
   * 카카오 지도 로드 함수
   */
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      new window.kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴
    });
  };
  return (
    <>
      {/* next/script 태그로 카카오 지도 로드 */}
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      {/* 카카오 지도가 그려질 영역 생성(id ="map") */}
      <div
        id="map"
        className="w-full h-screen"
      ></div>
    </>
  );
}
