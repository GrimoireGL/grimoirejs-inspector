export default class LayoutCalculator {

    static gridScale = 2.0;

    static getStride(scale) {
        const basement = Math.floor(Math.log10(scale));;
        return Math.pow(10, -basement + 1.0);
    }

    static *gridEnumrator(scale,offsetX){
      const stride = this.getStride(scale);
      const firstLine = offsetX - (offsetX % stride);
      for(let i = 0;; i++){
        const t = firstLine + i * stride;
        yield {
          time: t,
          screenX: LayoutCalculator.timeToScreenX(scale,offsetX,t,true),
          importance: LayoutCalculator.getImportance(scale,t)
        };
      }
    }


    static toTimeLabel(scale,time){
      const stride = LayoutCalculator.getStride(scale);
      const importance = LayoutCalculator.getImportance(scale,time);
      if(importance === 0){
        return "";
      }
      let result = "";
      if(stride >=100){
        result += (time /1000).toFixed(1);
        if(importance === 2){
          result +="s";
        }
      }else{
        result += time.toFixed(2);
        if(importance === 2){
          result +="ms";
        }
      }
      return result;
    }

    static timeToScreenX(scale,offsetX,time,isCanvas = false){
      const timeFromLeft = time - offsetX;
      const rawTime = scale * timeFromLeft * LayoutCalculator.gridScale;
      return isCanvas ? rawTime : rawTime / 2;
    }

    static screenXToTime(scale,offsetX,screenX,isCanvas = false){
      const scaled = LayoutCalculator.timeToScreenX(scale,0,1);
      const rawScreenX = offsetX + screenX / scaled;
      return isCanvas ? rawScreenX : rawScreenX * 2;
    }

    static movementXToTimeDelta(scale,movementX){
      const timeScale = LayoutCalculator.screenXToTime(scale,0,movementX);
      return movementX / 2.0;
    }

    static getImportance(scale, value) {
        const stride = LayoutCalculator.getStride(scale);
        if (value % (stride * 10) === 0) {
            return 2;
        } else if (value % (stride * 2) === 0) {
            return 1;
        } else {
            return 0;
        }
    }

    static getWidthByImportance(importance) {
        switch (importance) {
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 2;
        }
    }

    static getStyleByImportance(importance) {
        switch (importance) {
            case 0:
                return "white";
            case 1:
                return "white";
            case 2:
                return "orange";
        }
    }

    static getHeightByImportance(importance) {
        switch (importance) {
            case 0:
                return 10;
            case 1:
                return 15;
            case 2:
                return 15;
        }
    }
}
