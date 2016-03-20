var reminder=angular.module('reminder',[]);
reminder.filter('chazhao',[function()
{	
	
	return function(e,key)
	{	var r=[];
		var xx=function(items)
		{
			for(var i=0;i<items.length;i++)
			{
				if(items[i].title.indexOf(key)!=-1)
				{
					return true;
				}
			}
			return false;
		}
		
		for(var i=0;i<e.length;i++)
		{
			if(e[i].name.indexOf(key)!=-1 || xx(e[i].items))
			{
				r.push(e[i])
			}
		}
		return r;
	}
}])

reminder.controller('rectrl', ['$scope', function($scope){
	$scope.cindex=0;
	$scope.shijianliebiao=localStorage.x?JSON.parse(localStorage.x):[{name:'新列表',color:'purple',items:[]}];
	$scope.color=['blue','yellow','green','brown','purple','orange','pink'];
	$scope.addshijian=function(index)
	{
		var data={
			name:'新列表'+($scope.shijianliebiao.length+1),
			color:$scope.color[$scope.shijianliebiao.length%7],
			items:[]
		};
		$scope.shijianliebiao.push(data);
		localStorage.x = JSON.stringify($scope.shijianliebiao);
	}
	$scope.key="";
	var selectlist=document.querySelector(".hezi");
	$scope.huoqu=function(index)
	{
		$scope.cindex=index;
	}
	$scope.clearitem=function()
	{	if(selectlist.style.visibility=="visible"){
        	selectlist.style.visibility="hidden";
        }else{
        	selectlist.style.visibility="visible";
        }
		var r=[];
		for(var i=0;i<$scope.shijianliebiao.length;i++)
		{	
			if($scope.shijianliebiao.length==1){
				alert("最后一条 无法删除");
				return;
			}
			if(i != $scope.cindex)
			{
				r.push($scope.shijianliebiao[i])
			}
		}
		$scope.shijianliebiao = r;
		$scope.cindex = 0;
		localStorage.x = JSON.stringify($scope.shijianliebiao);
	}
	$scope.addTodo = function() {
	    var cu = $scope.shijianliebiao[$scope.cindex];
	    var data = {title:'新条目'+(cu.items.length+1),isDone:false};
	    cu.items.push(data);
	    localStorage.x = JSON.stringify($scope.shijianliebiao);
	  }

	$scope.deleteTodo = function(index) {
	   var r = [];
	   var cu = $scope.shijianliebiao[$scope.cindex]; 
	   for(var i=0 ; i<cu.items.length; i++){
	   	 
	     if( i != index){
	       r.push(cu.items[i]);
	     }
	   } 
	   $scope.shijianliebiao[$scope.cindex].items = r; 
	   localStorage.x = JSON.stringify($scope.shijianliebiao);
	 }
 	$scope.change=function(index){
         $scope.shijianliebiao[$scope.cindex].items[index].isDone=!$scope.shijianliebiao[$scope.cindex].items[index].isDone;
 	}
	 $scope.save = function() {
	     localStorage.x = JSON.stringify($scope.shijianliebiao);
	   }
	  $scope.countdone=function()
	  {	
	  	var r=0;
	  	for(var i=0;i<$scope.shijianliebiao[$scope.cindex].items.length;i++)
	  	{
	  		if($scope.shijianliebiao[$scope.cindex].items[i].isDone)
	  		{	
	  			r+=1;
	  		}
	  	}
	  	return r;
	  }
	  $scope.huanyuan=function(index){
		$scope.shijianliebiao[index].color=$scope.colors[index%7];
	}
	$scope.finish=function(){
		selectlist.style.visibility="hidden";
		$scope.shijianliebiao[$scope.cindex].name=$scope.aaaa;
	}
	$scope.showSelect=function(){
        if(selectlist.style.visibility=="visible"){
        	selectlist.style.visibility="hidden";
        }else{
        	selectlist.style.visibility="visible";
        }
	}
	  //$scope.copy=angular.copy($scope.shijianliebiao);
	
}])