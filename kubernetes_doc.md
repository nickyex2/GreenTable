Things to take note when hosting it into GKE or AWS

1. RabbitMQ needs to be reconfigured by going into the pod and use <code>rabbitmqctl</code>

<code>rabbitmqctl add_user admin admin</code>
<code>rabbitmqctl set_user_tags admin administrator</code>
<code>rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"</code>


2. view minikube dashboard

<code>minikube dashboard</code>


3. expose the ports required for application to function (NodePorts)

<code>minikube service "service-name" --url</code>



Things to test out to make sure local kube is fine before porting to GKE or AWS

1. export the services correctly (change them to NodePort)
2. test out the application without api gateway
3. Download Kong and configure
4. Host up