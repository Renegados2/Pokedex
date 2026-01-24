import { AfterViewInit, Component, effect, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-pixel-box',
  imports: [],
  templateUrl: './pixel-box.html',
  styleUrl: './pixel-box.css',
})
export class PixelBox implements AfterViewInit {
  public backgroundColor: InputSignal<string> = input.required()
  public borderOuterColor: InputSignal<string> = input.required()
  public borderInnerColor: InputSignal<string> = input.required()

  // Botons pokemon seleccionat
  public divBackgroundColor: InputSignal<string> = input("")
  public textColor: InputSignal<string> = input("")
  public svgCode: InputSignal<string> = input("")

  public width: InputSignal<number> = input(0)
  public height: InputSignal<number> = input(0)

  public name: InputSignal<string> = input.required()

  ngAfterViewInit(): void {
    if(this.svgCode()) {
        const svgTextElem = document.getElementById(this.name())

        if (svgTextElem) {
          svgTextElem.innerHTML = this.svgCode()
        }
      }
  }
 }
