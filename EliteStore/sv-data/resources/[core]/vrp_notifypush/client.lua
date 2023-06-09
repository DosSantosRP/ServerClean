-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONEXÃO
-----------------------------------------------------------------------------------------------------------------------------------------
func = Tunnel.getInterface("vrp_notifypush")
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADBUTTON
-----------------------------------------------------------------------------------------------------------------------------------------

RegisterKeyMapping ( 'vrp:viewqth' , 'QTH' , 'keyboard' , '9' )

RegisterCommand('vrp:viewqth', function()
	if func.checkPermission() then
		SendNUIMessage({ action = "showAll" })
	end
end, false)

-----------------------------------------------------------------------------------------------------------------------------------------
-- NOTIFYPUSH
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("NotifyPush")
AddEventHandler("NotifyPush",function(data)
	if func.checkPermission() then
		PlaySoundFrontend(-1,"Event_Message_Purple","GTAO_FM_Events_Soundset",false)
		data.loc = GetStreetNameFromHashKey(GetStreetNameAtCoord(data.x,data.y,data.z))

		SendNUIMessage({ action = "notify", data = data })
	end
end)

-------------- Evento para o Tablet de Assassino de Aluguel ----------------------------
RegisterNetEvent("NotifyPushAssassino")
AddEventHandler("NotifyPushAssassino",function(data)
	if func.checkPermissionAssassino() then
		PlaySoundFrontend(-1,"Event_Message_Purple","GTAO_FM_Events_Soundset",false)
		data.loc = GetStreetNameFromHashKey(GetStreetNameAtCoord(data.x,data.y,data.z))

		SendNUIMessage({ action = "notify", data = data })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FOCUSON
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("focusOn",function()
    SetNuiFocus(true,true)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FOCUSOFF
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("focusOff",function()
    SetNuiFocus(false)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETWAY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("setWay",function(data)
    SetNewWaypoint(data.x+0.0001,data.y+0.0001)
end)