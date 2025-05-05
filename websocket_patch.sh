#!/bin/bash
CONF_DIR="/etc/nginx/sites-enabled"
INSERT_TEXT="
        # Add websocket connection script to HTML <head>
        sub_filter_types text/html;
        sub_filter '<head>' '<head><script src=\"/ddev-websocket/SocketClient.js\"></script>';
        sub_filter '</body>' '<script src=\"/ddev-websocket/plugins/client/index.js\" type="module"></script></body>';
        sub_filter_once on;"

for NGINX_CONF in "$CONF_DIR"/*.conf; do
  [ -e "$NGINX_CONF" ] || continue  # Skip if no .conf files
  awk -v insert="$INSERT_TEXT" '
    /location[[:space:]]+[^{]*\{/ {
      in_location=1
      brace_count=1
      print
      next
    }
    in_location {
      brace_count += gsub(/\{/, "{")
      brace_count -= gsub(/\}/, "}")
      if (brace_count == 0) {
        print insert
        in_location=0
      }
      print
      next
    }
    { print }
  ' "$NGINX_CONF" > "${NGINX_CONF}.tmp" && mv "${NGINX_CONF}.tmp" "$NGINX_CONF"
done

supervisorctl restart nginx
