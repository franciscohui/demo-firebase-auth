var app = angular.module("demo-firebase-auth", ["firebase"]);

// Create a re-usable factory that generates the $firebaseAuth instance
// what's a factory?
app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://ng-fire-auth-demo.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);

// Use $firebaseAuth in the controller
app.controller("MainCtrl", ["$scope", "Auth",
  function($scope, Auth) {

    $scope.auth = Auth; 
    
    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

    $scope.signInUser = function(){
      $scope.message = null;
      $scope.error = null;

      Auth.$authWithPassword({email: $scope.email, password: $scope.password})      
      .then(function(authData) {
        console.log("Logged in as:", authData);
        console.log("Logged in as:", authData.password.email);
      })
      .catch(function(error) {
        $scope.error = error;
        console.error("Authentication failed:", error);
      });
    }; // $scope.signInUser

  } // function($scope, Auth)
]); // app.controller