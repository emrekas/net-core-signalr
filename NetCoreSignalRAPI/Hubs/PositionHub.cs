using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace NetCoreSignalRAPI.Hubs
{
    public class PositionHub : Hub
    {
        public Task ChangePosition(string user, string mouseX, string mouseY)
        {
            return Clients.All.SendAsync("NewPosition", user,mouseX, mouseY);
        }
    }
}