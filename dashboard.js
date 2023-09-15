angular.module('myApp', [])
    .controller('TeamListController', function() {
        var base = this;
        base.generalTarget = 200;
        base.teams = [
            {
                name: "Oración los Lunes",
                targetSales: 34,
                completedSales: {
                    general: 31,
                    beef: 25,
                    chicken: 6,
                },
                grupalSalesPercentage: -1,
                generalSalesPercentage: -1,
            },
            {
                name: "Oración los Martes",
                targetSales: 34,
                completedSales: {
                    general: 17,
                    beef: 12,
                    chicken: 5,
                },
                grupalSalesPercentage: -1,
                generalSalesPercentage: -1,
            },
            {
                name: "Oración los Miércoles",
                targetSales: 34,
                completedSales: {
                    general: 15,
                    beef: 15,
                    chicken: 0,
                },
                grupalSalesPercentage: -1,
                generalSalesPercentage: -1,
            },
            {
                name: "Oración los Jueves",
                targetSales: 34,
                completedSales: {
                    general: 24,
                    beef: 24,
                    chicken: 0,
                },
                grupalSalesPercentage: -1,
                generalSalesPercentage: -1,
            },
            {
                name: "Oración los Viernes",
                targetSales: 34,
                completedSales: {
                    general: 71,
                    beef: 65,
                    chicken: 6,
                },
                grupalSalesPercentage: -1,
                generalSalesPercentage: -1,
            },
            {
                name: "Oración los Sábados",
                targetSales: 30,
                completedSales: {
                    general: 25,
                    beef: 19,
                    chicken: 6,
                },
                grupalSalesPercentage: -1,
                generalSalesPercentage: -1,
            },
        ];

        base.totalSales = {
            general: base.teams.reduce((total, item) => { return total + item.completedSales.beef + item.completedSales.chicken; }, 0),
            beef: base.teams.reduce((total, item) => { return total + item.completedSales.beef; }, 0),
            chicken: base.teams.reduce((total, item) => { return total + item.completedSales.chicken; }, 0),
        }

        base.generalPercentage = ((base.totalSales.general / base.generalTarget)*100).toFixed(0);

        var oldTeams = base.teams;
        base.teams = [];
        angular.forEach(oldTeams, (team) => {
            const newTeam = team;
            newTeam.grupalSalesPercentage = (((newTeam.completedSales.beef + newTeam.completedSales.chicken) / newTeam.targetSales)*100).toFixed(1);
            newTeam.generalSalesPercentage = (((newTeam.completedSales.beef + newTeam.completedSales.chicken) / base.generalTarget)*100).toFixed(1);
            base.teams.push(newTeam);
        });

        let progressStartValue = 0;
        let progressEndValue = base.generalPercentage;
        let speed = 2000 / base.generalPercentage;
        let progressValueElement = document.querySelector('.progress-value');
        let percentageDivElement = document.querySelector('.porcentaje');

        percentageDivElement.style.setProperty('--porcentaje', base.generalPercentage);

        let progress = setInterval(() => {
            progressStartValue++;
            progressValueElement.textContent = `${progressStartValue}%`;
            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);

    })
    .directive('custom-chart-circle', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {},
            template:
                `<div class="font-italic">
                    `,
            replace: true
        }
    })
