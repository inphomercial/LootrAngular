
LootrApp.factory('StorageService', function(localStorageService) {

    var StorageService = {

        save: function( key, data )
        {
            localStorageService.set(key, data);
        },

        get: function( key )
        {
            var result = localStorageService.get(key);

            if(result === null || result.length < 0)
            {
                return [];
            }
            else
            {
                return result;
            }
        },

        clear: function()
        {
            console.log("clear");

            localStorageService.clearAll();
        }
    };

    return StorageService;
});
