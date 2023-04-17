export class Dark {
    DARK_MODE_BUTTON: HTMLElement;
    html: HTMLElement;
    LIGHT_MODE_SVG: SVGAElement;
    DARK_MODE_SVG: SVGAElement;
    DARK_MODE: boolean;
  
    constructor(){
      this.html = document.querySelector("html");
      this.DARK_MODE_BUTTON = document.querySelector("#dark");
      this.toggleDarkModeButton();
      this.LIGHT_MODE_SVG = document.querySelector("#light-mode");
      this.DARK_MODE_SVG = document.querySelector("#dark-mode");
      this.DARK_MODE = true;
    }
  
 
    private toggleDarkModeButton(): void {
      if (this.DARK_MODE_BUTTON) {
        this.DARK_MODE_BUTTON.addEventListener("click", () => {
          this.html.classList.toggle("dark");
          
          // toggle current mode
          this.DARK_MODE = !this.DARK_MODE;
          
          if (this.DARK_MODE) {
            this.DARK_MODE_SVG.classList.remove('hidden');
            this.LIGHT_MODE_SVG.classList.add('hidden');
          } else {
            this.DARK_MODE_SVG.classList.add('hidden');
            this.LIGHT_MODE_SVG.classList.remove('hidden');
          }
        });
      }
      
    }

    
    
     
    
   
  }
 

  

