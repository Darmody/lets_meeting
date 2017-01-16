import moment from '../../utils/moment-timezone'

const app = getApp()

const updateMeetingTimes = (meetingTimes, updatedTime) => meetingTimes.map(meetingTime => {
  const nowInTimezone = moment(updatedTime).tz(meetingTime.timezone)
  return {
    timezone: meetingTime.timezone,
    time: nowInTimezone.format('hh:mm'),
    date: nowInTimezone.format('YYYY-MM-DD'),
  }
})


Page({
  data: {
    m: moment,
    meetingTimes: [],
    timezones: [],
    currentTime: '',
    defaultTimeZone: 'Asia/Shanghai'
  },
  onLoad: function () {
    this.setData({
      timezones: app.globalData.timezones,
    })
  },

  handleTimezonePick: function (event) {
    const timeId = event.target.dataset.timeid
    const timezoneIndex = event.detail.value
    const timezones = this.data.timezones

    let meetingTimes = this.data.meetingTimes
    meetingTimes[timeId].timezone = timezones[timezoneIndex]

    const updatedTime = moment(this.data.currentTime)
      .tz(this.data.defaultTimeZone)
      .format()

    this.setData({
      currentTime: updatedTime,
      meetingTimes: updateMeetingTimes(meetingTimes, updatedTime),
    })
  },

  handleDatePick: function (event) {
    const date = event.detail.value

    const year = date.split('-')[0]
    const month = date.split('-')[1]
    const day = date.split('-')[2]

    const meetingTimes = this.data.meetingTimes

    const updatedTime = moment(this.data.currentTime)
      .tz(this.data.defaultTimeZone)
      .set({ year, month, day })
      .format()

    this.setData({
      currentTime: updatedTime,
      meetingTimes: updateMeetingTimes(meetingTimes, updatedTime),
    })
  },

  handleTimePick: function (event) {
    const time = event.detail.value

    const hour = time.split(':')[0]
    const minute = time.split(':')[1]

    const meetingTimes = this.data.meetingTimes

    const updatedTime = moment(this.data.currentTime)
      .tz(this.data.defaultTimeZone)
      .set({ hour, minute })
      .format()

    this.setData({
      currentTime: updatedTime,
      meetingTimes: updateMeetingTimes(meetingTimes, updatedTime),
    })
  },

  addMeetingTime: function() {
    const { meetingTimes, currentTime } = this.data

    if (!currentTime) {
      this.setData({
        currentTime: moment(),
      })
    }

    const now = moment(this.data.currentTime).tz(this.data.defaultTimeZone)

    this.setData({
      meetingTimes: [...meetingTimes, {
        timezone: this.data.defaultTimeZone,
        date: now.format('YYYY-MM-DD'),
        time: now.format('hh:mm'),
      }]
    })
  },
})
