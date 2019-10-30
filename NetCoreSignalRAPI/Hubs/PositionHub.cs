using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NetCoreSignalRAPI.Hubs
{
    //Bu sınıfı Hub olarak kullanacağımızı belirtiyoruz.
    public class PositionHub : Hub
    {
        public static HashSet<string> ActiveUsers = new HashSet<string>();

        //Hub'a bağlanan her kullanıcıyı ActiveUsers listeme atıyorum.
        public override Task OnConnectedAsync()
        {
            ActiveUsers.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        //İstemci tarafından çağıracağımız ChangePosition isminde bir metot oluşturuyoruz.
        public Task ChangePosition(string user, string mouseX, string mouseY)
        {
            //Bu kısımda veri kontrolü, değişimi veya kaydı yapabiliriz.

            //Ben sadece gelen değerlerin bütün kullanıcılara iletilmesini istedim.
            return Clients.All.SendAsync("NewPosition", user, mouseX, mouseY, ActiveUsers.Count);
        }
    }
}
