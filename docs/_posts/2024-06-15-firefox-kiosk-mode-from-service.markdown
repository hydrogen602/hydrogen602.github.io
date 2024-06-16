---
layout: default
title:  "Launching Firefox in kiosk mode from a linux service"
date:   2024-06-15 11:31:10 -0700
categories: electronics
---

# Launching Firefox in kiosk mode from a linux service

Relevant for small displays when rendering a web-based UI.

Small touchscreens, like 7-inch, can be found relatively inexpensively and so make easy interfaces between machines like 3D Printers and Web-UIs to the user.

## Why kiosk mode?

Firefox kiosk mode is a restricted mode where one browser window occupies the entire screen. Its useful for making web-based UIs on small, e.g. 7-inch touch screen, connected to a raspberry pi. Since the screen size is so small, tabs, the url bar, and the window frame start consuming a good fraction of the screen space. Thus kiosk mode, as it makes all these go away.

## Why a linux service?

Linux services are an easy way to ensure a program will be launched at startup, restarted if crashed, and logs are also handled for you by journalctl.

## The command to run

This is the basic command:
```sh
firefox --kiosk http://<some-url-goes-here>
```
Where the url to your UI goes after the `--kiosk` flag.

Sometimes the window is just slightly too small, in which case the width and height of the screen can be explicitly specified, like:

```sh
firefox --kiosk http://<some-url-goes-here> --display :0 --width 1024 --height 600
```
This is for a 1024 by 600 screen, you'd enter your own displays size there.

## Writing the service file

```
[Unit]
Description=FirefoxInKiosk
After=multi-user.target network.target

[Service]
Type=simple
ExecStart=firefox --kiosk http://<some-url-goes-here> --display :0 --width 1024 --height 600
Restart=always
RestartSec=30
User=<your-linux-username>

[Install]
WantedBy=multi-user.target
```

The user specification is important to both not have firefox run with root privileges, but also avoid issues with X11 permissions. So this should be the user that the desktop is logged into. 

Note: the specific display value to use, `:0` is used here as an example, can vary based on your setup. An easy way to figure it out is to open a terminal on your desktop and run:
```
echo $DISPLAY
```

### Installing the service

Go to
```sh
cd /etc/systemd/system/
```

Then lets create our service file:
```sh
sudo nano kiosk.service
```

Copy-and-paste the service file in here (example above).

After making changes, it might be necessary to run
```sh
sudo systemctl daemon-reload
```

And then to start it:
```sh
sudo systemctl start kiosk
```
Here, `kiosk` is determined by the name of the service file, e.g. `kiosk.service`

Now it should automatically start, and restart if something went wrong, and also start after boot.

#### Checking the status 
```sh
sudo systemctl status kiosk
```

#### Check the logs
```sh
sudo journalctl -u kiosk
```

## Troubleshooting

If getting something like `Authorization required, but no authorization protocol specified` and `Error: cannot open display: :0`, then the user you specified might not have access to X11 displays. The easiest solution I found is ensuring the user that logs into the desktop is also the user specified in the service file.

