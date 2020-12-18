app.factory('goTo', ['$window', '$interval', '$location', '$anchorScroll', function($window: any, $interval: any, $location: any, $anchorScroll: any) {
    return function(id: string, marginTop?: number, step?: number, seconds?: number): void {
        marginTop = marginTop || 100;
        step = step || 300;
        seconds = seconds || 50;
        var element: any = $window.document.getElementById(id);
        if (null === element) {
            return;
        }
        $location.hash(id);
        var position: number = element.getBoundingClientRect().top,
            before: number = 0,
            current: number = $window.scrollY;
        if (current > position) {
            position += current;
            var go = $interval(function(): void {
                $window.scrollTo(0, current);
                before = current;
                current -= step;
                if (position >= current || before === current) {
                    $anchorScroll();
                    $window.scrollTo(0, $window.scrollY - marginTop);
                    $interval.cancel(go);
                }
            }, seconds);
        } else {
            var go = $interval(function(): void {
                $window.scrollTo(0, current);
                before = current;
                current += step;
                if (position <= current || before === current) {
                    $anchorScroll();
                    $window.scrollTo(0, $window.scrollY - marginTop);
                    $interval.cancel(go);
                }
            }, seconds);
        }
    };
}]);