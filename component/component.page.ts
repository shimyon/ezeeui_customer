import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-component",
  templateUrl: "./component.page.html",
  styleUrls: ["./component.page.scss"],
})
export class ComponentPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  slideOpts2 = {
    initialSlide: 1,
    slidesPerView: 4,
    speed: 400,
  };

  topService = [
    {
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
  ];

  constructor() {}

  ngOnInit() {}
}
