/*global kakao*/ // 카카오 객체 정의

import Script from 'next/script';
import * as stores from '@/data/store_data.json';

/**
 * window 객체의 kakao 프로퍼티 추가 선언(TS)
 */
declare global {
  interface Window {
    kakao: any;
  }
}

// 강남역 기본 좌표
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map() {
  /**
   * 카카오 지도 로드 함수
   */
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴

      // 식당 데이터 마커 띄우기
      stores?.["DATA"]?.map((store) => {
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts,
          store?.x_cnts
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
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
