import { Component, OnInit } from '@angular/core';

/**
 * 기    능: 사용자에게 제일 처음 보여질 메인화면
 * HISTORY:
 * - 20220201: 김기범 : Create
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {


  }


  ngOnInit(): void {

  }
  /**
   * 기    능: 올빼미 슬라이더의 커스텀옵션을 사용할수있게 하는법
   * 주의사항: responsive는 한화면에 보여줄 반응형 화면 영역 이므로 사이즈를 잘 조절하여 할수있도록합니다
   * 참    조: dashboard.html 
   */
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    pullDrag: false,
    touchDrag:true,
    autoplayHoverPause:true,
    autoplay:true,
    dots: false,
    nav:false,
    passive:false,
    margin:20,
    navSpeed: 800,
    items:4,
    responsive: {
      1500:{
        items:4,
      }
    }
    }

  }
