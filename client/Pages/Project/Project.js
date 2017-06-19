function Project(projectName) {

    this.socket = io();
    this.apiBase = 'http://localhost:8080/';

    this.usersConnectedNotify = function () {
        this.socket.on('user connected', function (user) {
            var usersConnected = parseInt($('#connectedUsers').text());
            var users = usersConnected++;
            $('#connectedUsers').text(users);
            console.log(user);
        });

        this.socket.on('user disconnected', function (user) {
            var usersConnected = parseInt($('#connectedUsers').text());
            $('#connectedUsers').text(usersConnected--);
            console.log(user);
        });
    }

    this.emitTextChanged = function (ev) {
        var text = $(ev.target).text();
        this.socket.emit('text changed', { text: text, user: '' });
        this.socket.on('text changed', function (text) {
            $('#editor').text(text);
        });
    }

    this.sendPassword = function (ev) {
        ev.preventDefault();
        $.post(this.apiBase + 'password/', { name: project.name, pwd: project.pwd }, function (project, status) {
            if (status === '401') {
                $('input[name="password"]').notify("Wrong Password", "error");
            } else {
                this.createProjectPage(project)
            }
        })
    };

    this.popOver = function (e) {
        e.preventDefault()
        if ($('.popover.open').length > 0) {
            $('.popover').removeClass('open')
        } else {
            var popover = $($(this).data('popover'));
            popover.toggleClass('open')
            e.stopImmediatePropagation();
        }
    };

    this.setText = function (ev) {

    };

    this.createProjectPage = function (project) {
        var pb = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/Project/Project.html',
            data: project
        });

        pb.render(function () {
            this.usersConnectedNotify();
            $('#editor').on('blur keyup paste input', this.emitTextChanged.bind(this));
            $('[data-popover]').click(this.popOver);


        }.bind(this));
    }

    this.createPwdPage = function () {
        var pb = new PageBuilder({
            container: '#main',
            templateUrl: './Pages/Project/PwdPage.html',
        });

        pb.render(function () {
<<<<<<< HEAD
            $('#passwordInput').submit(this.sendPassword);
=======
            $('#passwordInput').submit(function (ev) {
                ev.preventDefault();
                var request = $.ajax({
                    url: 'http://localhost:8080/password/',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({ name: projectName, pwd: $('input[type="password"]').val() })
                })
                    .done(function (project) {
                        this.createProjectPage(project)
                    }.bind(this))
                    .fail(function(){
                        $('input[name="password"]').notify("Wrong Password", "error");
                    });

            }.bind(this))
>>>>>>> d4346bc34a5d027696c97d34d2a2411aad38069f
        }.bind(this));
    }

    this.render = function () {
<<<<<<< HEAD
        $.get(this.apiBase + 'project/', { name: projectName }, function (project, status) {
            if (status === '401') {
                this.createPwdPage(project);
            } else {
                this.createProjectPage(project)
            }
        }.bind(this))
=======
        var request = $.ajax({
            url: 'http://localhost:8080/project/',
            type: 'GET',
            contentType: 'application/json',
            data: { name: projectName },
        })
            .done(function (project) {
                this.createProjectPage(project);
            }.bind(this))
            .fail(function (msg, resp) {
                this.createPwdPage();
            }.bind(this));



>>>>>>> d4346bc34a5d027696c97d34d2a2411aad38069f
    }

}