export default class GridHighlighter {

    static gridScale = 2.0;

    static getStride(scale) {
        const basement = Math.floor(Math.log10(scale));;
        return Math.pow(10, -basement + 1.0);
    }

    static getImportance(scale, value) {
        const stride = GridHighlighter.getStride(scale);
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
