/*global kakao*/ // 카카오 객체 정의

import Script from 'next/script';
import { Dispatch, SetStateAction } from 'react';

/**
 * window 객체의 kakao 프로퍼티 추가 선언(TS)
 */
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
}

// 강남역 기본 좌표
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map({ setMap }: MapProps) {
  /**
   * 카카오 지도 로드 함수
   */
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      var mapContainer = document.getElementById('map'); // 지도를 표시할 div
      var mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      var map = new window.kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴

      setMap(map);
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
